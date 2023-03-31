import React, { useState } from 'react'
import './Stylesheets/RecordPage.css'
const RecordPage = ({ hospitalRecords, index, hospitalList }) => {
  const [episodeSearchValue, setEpisodeSearchValue] = useState(0)
  const [visitSearchValue, setVisitSearchValue] = useState(0)
  const [recordSearchValue, setRecordSearchValue] = useState(0)
  const episodeOptionList = [];
  const visitOptionsList = [];
  const recordOptionsList = [];
  hospitalRecords.data.map((hospitalRecord, index) => {
    if (episodeOptionList.findIndex(item => item.value === parseInt(hospitalRecord.record.visit.episode.episodeId)) === -1) {
      episodeOptionList.push({
        id: index,
        value: parseInt(hospitalRecord.record.visit.episode.episodeId),
        displayName: "[" + hospitalRecord.record.visit.episode.episodeId + "] - " + hospitalRecord.record.visit.episode.episode_type
      })
    }
    if (visitOptionsList.findIndex(item => item.value === parseInt(hospitalRecord.record.visit.visitId)) === -1) {
      visitOptionsList.push({
        id: index,
        value: parseInt(hospitalRecord.record.visit.visitId),
        displayName: "[" + hospitalRecord.record.visit.visitId + "] - " + hospitalRecord.record.visit.visit_date.substring(0, 16)
      })
    }
    if (recordOptionsList.findIndex(item => item.value === parseInt(hospitalRecord.record.recordId)) === -1) {
      recordOptionsList.push({
        id: index,
        value: parseInt(hospitalRecord.record.recordId),
        displayName: "[" + hospitalRecord.record.recordId + "] - Problem: " + hospitalRecord.record.problem
      })
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
  console.log("Episode List:: ", episodeOptionList)
  console.log("Visit List:: ", visitOptionsList)
  console.log("Record List:: ", recordOptionsList)
  return (
    <div>
      <div className='HospitalRecordsContainer'>
        <div className='FiltersContainer'>
          <div className='HospitalTitle'>Hospital : [{hospitalRecords.hospitalId}] - {hospitalRecords.hospitalName}</div>
          <div className='RecordsFilter'>
            <label className='InputLabel'>Filters : Episode</label>
            <select
              name="episodeSearchValue"
              className="InputText"
              value={episodeSearchValue}
              onChange={e => setEpisodeSearchValue(parseInt(e.target.value))}
              required>
              <option value="0">All</option>
              <Options options={episodeOptionList} />
            </select>
          </div>
          <div className='RecordsFilter'>
            <label className='InputLabel'>Visit</label>
            <select
              name="visitSearchValue"
              className="InputText"
              value={visitSearchValue}
              onChange={e => setVisitSearchValue(parseInt(e.target.value))}
              required>
              <option value="0">All</option>
              <Options options={visitOptionsList} />
            </select>
          </div>
          <div className='RecordsFilter'>
            <label className='InputLabel'>Record</label>
            <select
              name="recordSearchValue"
              className="InputText"
              value={recordSearchValue}
              onChange={e => setRecordSearchValue(parseInt(e.target.value))}
              required>
              <option value="0">All</option>
              <Options options={recordOptionsList} />
            </select>
          </div>
          
          <div className='RecordsFilter'>
            <button onClick={()=>{setEpisodeSearchValue(0); setRecordSearchValue(0); setVisitSearchValue(0)}} className="InputButton">Reset</button>
          </div>
        </div>
        {
          (
            hospitalRecords.data
              .filter((hospitalRecord) => { return (episodeSearchValue === 0 || episodeSearchValue === hospitalRecord.record.visit.episode.episodeId) })
              .filter((hospitalRecord) => { return (visitSearchValue === 0 || visitSearchValue === hospitalRecord.record.visit.visitId) })
              .filter((hospitalRecord) => { return (recordSearchValue === 0 || recordSearchValue === hospitalRecord.record.recordId) }).length === 0
          ) ? <div className='RecordPageMessage'> No Data With Specified Filters...</div> :

            <table className="HospitalRecordTable">
              <thead>
                <tr>
                  <th scope="col">Sl. No.</th>
                  <th scope="col">Episode</th>
                  <th scope="col">Visit</th>
                  <th scope="col">Record</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Treatment</th>
                  <th scope="col">Medicine</th>
                  <th scope="col">Dosage</th>
                  <th scope="col">Dosage Timing</th>
                </tr>
              </thead>
              <tbody>
                {hospitalRecords.data
                  .filter((hospitalRecord) => { return (episodeSearchValue === 0 || episodeSearchValue === hospitalRecord.record.visit.episode.episodeId) })
                  .filter((hospitalRecord) => { return (visitSearchValue === 0 || visitSearchValue === hospitalRecord.record.visit.visitId) })
                  .filter((hospitalRecord) => { return (recordSearchValue === 0 || recordSearchValue === hospitalRecord.record.recordId) })
                  .map((hospitalRecord, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>[{hospitalRecord.record.visit.episode.episodeId}] : {hospitalRecord.record.visit.episode.episode_type}</td>
                      <td>[{hospitalRecord.record.visit.visitId}] on {hospitalRecord.record.visit.visit_date.substring(0, 16)}</td>
                      <td>{hospitalRecord.record.recordId} / {hospitalRecord.prescriptionId}</td>
                      <td>[{hospitalRecord.record.visit.doctor.doctorId}] {hospitalRecord.record.visit.doctor.firstName} {hospitalRecord.record.visit.doctor.lastName}</td>
                      <td>{hospitalRecord.record.problem}</td>
                      <td>{hospitalRecord.record.treatment}</td>
                      <td>{hospitalRecord.medicine}</td>
                      <td>{hospitalRecord.dosage}</td>
                      <td>{hospitalRecord.dosage_timing}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        }
      </div>
    </div>

  )
}

export default RecordPage