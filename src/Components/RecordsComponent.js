import React, {useState, useEffect} from 'react'
// import healthRecords from '../newHealthRecords.json'
import HospitalComponent from './HospitalComponent'
import EHRRequestService from '../Services/EHRRequestService'
import './Stylesheets/RecordsPage.css'
const RecordsComponent = ({user}) => {
    const [hospitalSearchValue, setHospitalSearchValue] = useState(parseInt(0))
    const [healthRecords, setHealthRecords] = useState([])
    useEffect(() => {
        async function fetchData() {
          if (user) {
            const data = await EHRRequestService.getMyData(user)
            setHealthRecords(data)
            console.log("Data Records: ", data)
          }
        }
        fetchData()
      }, [])

    const hospitalList = healthRecords.map((hospitalRecords, index) => {
        return {
            "index": index,
            "hospital_id": hospitalRecords.hospitalId,
            "hospital_name": hospitalRecords.hospitalName
        }
    })
    const hospitalOptionList = hospitalList.map((hospitalItem, index) => {
        return {
            id: index,
            value: parseInt(hospitalItem.hospital_id),
            displayName: "[" + hospitalItem.hospital_id + "] - " + hospitalItem.hospital_name
        }
    })
    function Options({ options }) {
        return (
            options.map(option =>
                <option key={option.id} value={option.value}>
                    {option.displayName}
                </option>)
        );
    }
    console.log(healthRecords)
  return (
    <div className='RecordsPage'>
            <div className='RecordsPageTitle'>
                Your Health Records, here !
            </div>
            <div className='RecordsPageContainer'>
                <div className='RecordsFilter'>
                    <label className='InputLabel'>Filter by: Hospital</label>
                    <select
                        name="hospitalSearchValue"
                        className="InputText"
                        value={hospitalSearchValue}
                        onChange={e => setHospitalSearchValue(parseInt(e.target.value))}
                        required>
                        <option value="0">All</option>
                        <Options options={hospitalOptionList} />
                    </select>
                </div>
                
                {
                    (healthRecords.length === 0) &&
                    <div className='RecordsPageMessage'>
                        No Health Records Available
                    </div>
                }
                {
                    (healthRecords.length !== 0) &&
                    <div>
                        {healthRecords.filter((hospital) => { return (hospitalSearchValue === 0 || hospitalSearchValue === hospital.hospitalId) }).map((hospitalRecords, index) => (
                            <HospitalComponent
                            key={index}
                            index = {index}
                            hospitalRecords={hospitalRecords}
                            />
                        ))
                        }
                    </div>
                }

            </div>
        </div>
  )
}

export default RecordsComponent