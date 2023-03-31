import React from 'react'
import './Stylesheets/RecordComponent.css'
const RecordComponent = ({ record, visitDate, index }) => {
    return (
        <div>
            <div className='RecordTitle'>
                Electronic Health Record
            </div>
            <div className='MainContent'>
                <div className='row'>
                    <div className='col'>Record Id. : {record.recordId}</div>
                    <div className='col colExtra'>Visit Date : {visitDate.substring(0, 16)}</div>
                </div>
                <div className='row'>
                    <div className='col'>Doctor : {record.doctor.doctorId} - {record.doctor.firstName} {record.doctor.lastName}</div>
                    <div className='col'></div>
                </div>
                <div className='row'>
                    <div className='col'>Problem : {record.problem}</div>
                    <div className='col colExtra'>Treatment : {record.treatment}</div>
                </div>
                <h4 className='PrescriptionTitle'>Prescription</h4>
                <div>
                    {
                        (record.prescriptions.length === 0) ?
                            <h4>No Medicines Prescribed...</h4> :
                            <div className='PrecriptionContainer'>
                                <table className="PrecriptionTable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id.</th>
                                            <th scope="col">Medicine</th>
                                            <th scope="col">Dosage</th>
                                            <th scope="col">Medication Timings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.prescriptions.map((PrecriptionItem) => {
                                            return (
                                                <tr>
                                                    <td>{PrecriptionItem.prescriptionId}</td>
                                                    <td>{PrecriptionItem.medicine} </td>
                                                    <td>{PrecriptionItem.dosage}</td>
                                                    <td>{PrecriptionItem.dosage_timing}</td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default RecordComponent