import React, { useEffect, useState } from 'react'
import ConsentRecord from './ConsentRecord'
import { IoMdArrowDroprightCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
const ConsentVisit = ({ visit, index, parentChecked, setParentChecked, recordIdList, setRecordIdList, hospitalId }) => {
    // console.log(visit)
    const [recordSearchValue, setRecordSearchValue] = useState(parseInt(0))
    const [expandVisitComponent, setExpandVisitComponent] = useState(true)
    const [checked, setChecked] = useState(parentChecked);
    const handleChange = () => {
        setChecked(!checked);
        // setParentChecked(!checked)
    };
    const RecordList = visit.records.map((record, index) => {
        return {
            "index": index,
            "record_id": record.recordId,
            "problem": record.problem
        }
    })
    // console.log("Record List: ",RecordList)
    const recordOptionList = RecordList.map((recordItem, index) => {
        return {
            id: index,
            value: parseInt(recordItem.record_id),
            displayName: "[" + recordItem.record_id + "] - " + recordItem.problem
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
        setChecked(parentChecked)
    }, [parentChecked]);
    useEffect(() => {
        if (!checked)
            setParentChecked(false);
    }, [checked]);
    return (
        <div className='RecordComponent'>
            {/* {
                <input type="checkbox" checked={parentChecked || checked} onChange={handleChange} />
            } */}
            {

                (!expandVisitComponent) ?
                    (
                        <div>
                            <IoMdArrowDroprightCircle onClick={() => { setExpandVisitComponent(true) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Visit : {visit.visitId} - {visit.visit_date.substring(0, 16)}</b>
                        </div>
                    ) :
                    (
                        <div>
                            <IoMdArrowDropdownCircle onClick={() => { setExpandVisitComponent(false) }} size={25} className='RecordsIcon' />
                            <b className='RecordsTitle'>Visit : {visit.visitId} - {visit.visit_date.substring(0, 16)}</b>
                        </div>
                    )

            }
            {
                (expandVisitComponent) &&
                <div className='VisitPageContainer'>
                    {
                        <>
                        <input type="checkbox" className='InputLabel' checked={parentChecked || checked} onChange={handleChange} />
                        {(parentChecked || checked) ? <b style={{color: "green"}}>Visit Selected</b> : <b style={{color: "brown"}}>Visit Not Selected</b>}
                        </>
                        
                    }
                    <div className='RecordsFilter'>
                        <label className='InputLabel'>Filter by: Record</label>
                        <select
                            name="recordSearchValue"
                            className="InputText"
                            value={recordSearchValue}
                            onChange={e => setRecordSearchValue(parseInt(e.target.value))}
                            required>
                            <option value="0">All</option>
                            <Options options={recordOptionList} />
                        </select>
                    </div>
                    <br /><br />
                    {
                        (visit.records.length === 0) &&
                        <div className='RecordsPageMessage'>
                            No Records Available
                        </div>
                    }
                    {
                        (visit.records.length !== 0) &&
                        <div>
                            {visit.records.filter((record) => { return (recordSearchValue === 0 || recordSearchValue === record.recordId) }).map((record, index) => (
                                <ConsentRecord
                                    key={index}
                                    index={index}
                                    record={record}
                                    visitDate={visit.visit_date}
                                    parentChecked={checked}
                                    setParentChecked={setChecked}
                                    recordIdList={recordIdList}
                                    setRecordIdList={setRecordIdList}
                                    hospitalId={hospitalId}
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

export default ConsentVisit