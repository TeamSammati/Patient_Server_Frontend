import React, { useState, useEffect } from 'react'
import RecordPage from './RecordPage';
import './Stylesheets/RecordsPage.css'
const RecordsPage = ({ healthRecords }) => {
    console.log("Health Records: ", healthRecords)
    const [hospitalSearchValue, setHospitalSearchValue] = useState(parseInt(0))
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

    // const hospitalwiseRecords = healthRecords.map((hospitalRecords, index1) => {
    //     return {
    //         "data": hospitalRecords.data.map((hospitalRecord, index2) => {
    //             return {
    //                 "episode_id": hospitalRecord.record.visit.episode.episodeId,
    //                 "episode_type": hospitalRecord.record.visit.episode.episode_type,
    //                 "visit_id": hospitalRecord.record.visit.visitId,
    //                 "visit_date": hospitalRecord.record.visit.visit_date,
    //                 "record_id": hospitalRecord.record.recordId,
    //                 "prescription_id": hospitalRecord.prescriptionId,
    //                 "medicine": hospitalRecord.medicine,
    //                 "dosage": hospitalRecord.dosage,
    //                 "dosage_timing": hospitalRecord.dosage_timing,
    //                 "doctor_id": hospitalRecord.record.visit.doctor.doctorId,
    //                 "doctor_name": hospitalRecord.record.visit.doctor.firstName + " " + hospitalRecord.record.visit.doctor.lastName,
    //                 "hospital_index": index1,
    //                 "hospital_record_index": index2
    //             }
    //         })
    //     }
    // })

    //console.log("hospitalwiseRecords: ", hospitalwiseRecords);
    // const groupedByEpisodeId = prescriptions.reduce((result, item) => {
    //     const id = item.record.visit.episode.episodeId;
    //     if (!result[id]) {
    //         result[id] = [];
    //     }
    //     result[id].push(item);
    //     return result;
    // }, {});
    useEffect(() => {
        console.log("hospitalSearchValue: ", hospitalSearchValue)
    }, [hospitalSearchValue])

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
                <br/><br/>
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
                            <RecordPage
                                hospitalRecords={hospitalRecords}
                                index={index}
                                key={index}
                                hospitalList={hospitalList}
                            />
                        ))
                        }
                    </div>
                }

            </div>
        </div>

    )
}

export default RecordsPage