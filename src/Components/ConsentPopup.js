import React, { useState } from 'react'
import './Stylesheets/ConsentPopup.css'
import healthRecords from '../newHealthRecords.json'
import ConsentRecords from './ConsentRecords'
const Popup = (props) => {
    return (
    (props.trigger) ?
    <div className='PopupPage' style={{height: window.innerHeight+'px'}}>
        <div className='PopupContainer'>
            <button className='BtnClose InputButton' onClick={() => props.closePopup(false)}>Close</button>

            {props.children}
            <br/>
            <ConsentRecords healthRecords={healthRecords}/>
        </div>
    </div> :
    ""
  )
}

export default Popup