import React, { useState } from 'react'
import VisitComponent from './VisitComponent'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
const EpisodeComponent = ({ episode, index }) => {
    // console.log(episode)
    const [visitSearchValue, setVisitSearchValue] = useState(parseInt(0))
    const [expandEpisodeComponent, setExpandEpisodeComponent] = useState(false)
    const visitList = episode.visits.map((visit, index) => {
        return {
            "index": index,
            "visit_id": visit.visitId,
            "visit_date": visit.visit_date.substring(0, 16)
        }
    })
    // console.log("Visit List: ",visitList)
    const visitOptionList = visitList.map((visitItem, index) => {
        return {
            id: index,
            value: parseInt(visitItem.visit_id),
            displayName: "[" + visitItem.visit_id + "] - " + visitItem.visit_date
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
        <div className='RecordComponent'>
            {
                (!expandEpisodeComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandEpisodeComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Episode : {episode.episodeId} - {episode.episode_type}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandEpisodeComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>{episode.episodeId} - {episode.episode_type}</b>
                        </div>
                    )

            }
            {
                (expandEpisodeComponent) &&
                <div className='EpisodePageContainer'>
                    <div className='RecordsFilter'>
                        <label className='InputLabel'>Filter by: Visit</label>
                        <select
                            name="visitSearchValue"
                            className="InputText"
                            value={visitSearchValue}
                            onChange={e => setVisitSearchValue(parseInt(e.target.value))}
                            required>
                            <option value="0">All</option>
                            <Options options={visitOptionList} />
                        </select>
                    </div>
                    <br /><br />
                    {
                        (episode.visits.length === 0) &&
                        <div className='RecordsPageMessage'>
                            No Visits Available
                        </div>
                    }
                    {
                        (episode.visits.length !== 0) &&
                        <div>
                            {episode.visits.filter((visit) => { return (visitSearchValue === 0 || visitSearchValue === visit.visitId) }).map((visit, index) => (
                                <VisitComponent
                                    key={index}
                                    index={index}
                                    visit={visit}
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

export default EpisodeComponent