import React, { useState, useEffect } from 'react'
// import './Stylesheets/HospitalComponent.css'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
import ConsentEpisode from './ConsentEpisode';
const ConsentHospital = ({ hospitalRecords, index, consentDataMappingDTOList, setConsentDataMappingDTOList }) => {
    const [episodeSearchValue, setEpisodeSearchValue] = useState(parseInt(0))
    const [expandHospitalComponent, setExpandHospitalComponent] = useState(true)
    const [recordIdList, setRecordIdList] = useState([]);
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };
    const episodeList = hospitalRecords.data.map((episode, index) => {
        return {
            "index": index,
            "episode_id": episode.episodeId,
            "episode_type": episode.episode_type
        }
    })
    const episodeOptionList = episodeList.map((episodeItem, index) => {
        return {
            id: index,
            value: parseInt(episodeItem.episode_id),
            displayName: "[" + episodeItem.episode_id + "] - " + episodeItem.episode_type
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
    useEffect(() => {
        // console.log(recordIdList)
        const mappingList = recordIdList.map((record) => {
            return{
                hospitalId: hospitalRecords.hospitalId,
                recordId: record
            }
        });
        // console.log("Mapping List: ",mappingList);
        setConsentDataMappingDTOList(consentDataMappingDTOList.filter((item)=> item.hospitalId !== hospitalRecords.hospitalId))
        setConsentDataMappingDTOList((consentDataMappingDTOList)=> [...consentDataMappingDTOList, ...mappingList]);
        //setConsentDataMappingDTOList((consentDataMappingDTOList)=>[... new Set(consentDataMappingDTOList.map(JSON.stringify))].map(JSON.parse))
    }, [recordIdList]);
    return (
        <div className='RecordComponent'>
            {/* {
                <input type="checkbox" checked={checked} onChange={handleChange} value={hospitalRecords.hospitalId} />
            } */}
            {
                (!expandHospitalComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandHospitalComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Hospital : {hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandHospitalComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Hospital : {hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    )

            }
            {
                (expandHospitalComponent) &&
                <div className='HospitalPageContainer'>
                    {
                        <>
                        <input className='InputLabel' type="checkbox" checked={checked} onChange={handleChange}/>
                        {(checked) ? <b style={{color: "green"}}>Hospital Selected</b> : <b style={{color: "brown"}}>Hospital Not Selected</b>}
                        </>
                    }
                    <div className='RecordsFilter'>
                        <label className='InputLabel'>Filter by: Episode</label>
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
                    <br /><br />
                    {
                        (hospitalRecords.data.length === 0) &&
                        <div className='RecordsPageMessage'>
                            No Episodes Available
                        </div>
                    }
                    {
                        (hospitalRecords.data.length !== 0) &&
                        <div>
                            {hospitalRecords.data.filter((episode) => { return (episodeSearchValue === 0 || episodeSearchValue === episode.episodeId) }).map((episode, index) => (
                                <ConsentEpisode
                                    key={index}
                                    index={index}
                                    episode={episode}
                                    parentChecked={checked}
                                    setParentChecked={setChecked}
                                    recordIdList={recordIdList}
                                    setRecordIdList={setRecordIdList}
                                    hospitalId={hospitalRecords.hospitalId}
                                />
                            ))
                            }
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default ConsentHospital