import React, { useState, useEffect } from 'react'
import ConsentHospital from './ConsentHospital';
import EHRRequestService from '../Services/EHRRequestService'

// import './Stylesheets/RecordsPage.css'
const ConsentRecords = ({consentResponseHandler, consentRequestId, user, otpValidation, setOtpValidation, consentValidationHandler, doctorId }) => {
    const [hospitalSearchValue, setHospitalSearchValue] = useState(parseInt(0));
    const [consentDataMappingDTOList, setConsentDataMappingDTOList] = useState([]);
    const [duration, setDuration] = useState(1);
    const [checked, setChecked] = useState(true);
    const [otp, setOtp] = useState('');
    const [healthRecords, setHealthRecords] = useState([])
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const data = await EHRRequestService.getMyData(user)
        setHealthRecords(data);
        console.log("Data Records: ", data)
      }
    }
    fetchData()
  }, [])
    const handleChange = () => {
        setChecked(!checked);
    };
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
    const handleSubmit = (event) => {
        event.preventDefault();
        let consentType = 1;
        if (!checked)
            consentType = 0;
        const cr_response = {
            "consentRequestId": consentRequestId,
            "patientId": user.patientId,
            "duration": parseInt(duration),
            "consentType": consentType,
            "activationStatus": 1,
            "patientPhoneNo": user.phoneNumber,
            "doctorId" : doctorId,
            "consentDataMappingDTOList": consentDataMappingDTOList
        }
        console.log(cr_response);
        consentResponseHandler(cr_response);
    }
    const handleValidate = (event) => {
        event.preventDefault();
        const cr_response = {
            "otp": otp,
            "patientId": user.patientId
        }
        consentValidationHandler(cr_response);
    }

    //console.log(healthRecords)
    useEffect(() => {
        console.log(consentDataMappingDTOList)
    }, [consentDataMappingDTOList]);
    return (
        <div className='RecordsPage'>
            <div className='RecordsPageTitle'>
                Now Give, Granular Consent!
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
                            <ConsentHospital
                                key={index}
                                index={index}
                                hospitalRecords={hospitalRecords}
                                consentDataMappingDTOList={consentDataMappingDTOList}
                                setConsentDataMappingDTOList={setConsentDataMappingDTOList}
                            />
                        ))
                        }
                    </div>
                }
                {
                    <div>
                        <div>
                            <label className='InputLabel' style={{ color: "navy" }}>Consent Duration (Days): </label>
                            <input type="number" min="1" max="90" className='InputText' value={duration} onChange={(e) => setDuration(e.target.value)} defaultValue="1" />
                        </div>
                        <br />
                        <div style={{ textAlign: "center" }}>
                            <input className='InputLabel' type="checkbox" checked={checked} onChange={handleChange} />
                            <b style={{ fontSize: "14px" }}>By Default it's a Delegatable Consent. <br />If you don't want this request to be delegatable, you can uncheck.</b>
                        </div>
                        <br />
                        <div style={{ fontStyle: "italic", fontFamily: "cursive", textAlign: "center" }}>
                            Please have a look at our <a href="https://www.sammati.site" target="_blank" rel="noreferrer" style={{ color: "blue" }}>Privacy Policy</a> <br />
                            <b>By Clicking on Submit Button or Enter, This meant to us as, "your Sammati".</b>
                            <br />
                            {
                                (!otpValidation) ?
                                    <form onSubmit={handleSubmit}>
                                        <button type="submit" className='InputButton' disabled={otpValidation}>Submit</button>
                                    </form>
                                    :
                                    <form onSubmit={handleValidate}>
                                        <input type="password" className='InputText' value={otp} onChange={(e) => { setOtp(e.target.value) }} required/>
                                        <button type="submit" className='InputButton' disabled={!otpValidation}>Validate</button>
                                        <button className='InputButton' disabled={!otpValidation} onClick={()=>{setOtpValidation(false); setOtp('');}}>Reset</button>
                                    </form>
                            }

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ConsentRecords