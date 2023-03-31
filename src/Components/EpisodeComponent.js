import React, { useState } from 'react'
import VisitComponent from './VisitComponent'

const EpisodeComponent = ({ episode, index }) => {
    // console.log(episode)
    const [visitSearchValue, setVisitSearchValue] = useState(parseInt(0))
    const visitList = episode.visits.map((visit, index) => {
        return {
            "index": index,
            "visit_id": visit.visitId,
            "visit_date": visit.visit_date.substring(0,16)
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
        <div>
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
        </div>
    )
}

export default EpisodeComponent