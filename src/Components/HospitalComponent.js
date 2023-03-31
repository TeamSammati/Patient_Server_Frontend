import React, { useState } from 'react'
import EpisodeComponent from './EpisodeComponent'
import './Stylesheets/HospitalComponent.css'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
const HospitalComponent = ({ hospitalRecords, index }) => {
    const [episodeSearchValue, setEpisodeSearchValue] = useState(parseInt(0))
    const [expandHospitalComponent, setExpandHospitalComponent] = useState(false)
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
    return (
        <div>
            {
                (!expandHospitalComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandHospitalComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>{hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandHospitalComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>{hospitalRecords.hospitalId} - {hospitalRecords.hospitalName}</b>
                        </div>
                    )
                    
            }
            {
                (expandHospitalComponent) &&
                <div className='HospitalPageContainer'>
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
                                <EpisodeComponent
                                    key={index}
                                    index={index}
                                    episode={episode}
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

export default HospitalComponent