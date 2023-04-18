import React, { useEffect, useState } from 'react'
// import consentResponseService from '../Services/ConsentResponseService'
import ConsentRequestService from '../Services/ConsentRequestService'
import swal from 'sweetalert';
// import './Stylesheets/ActiveConsent.css';
import {BiRightArrow} from 'react-icons/bi';
const ActiveConsent = ({ consentId, index, consentRequestId, patientId, consentType, doctorId, doctorName }) => {
    
    const [duration, setDuration] = useState(1);
    
    const consentRevokeHandler = async (reqParams) => {
        try {
            const response = await ConsentRequestService.consentRevoke(reqParams)
            if (response) {
                swal({
                    title: "Operation Successfull",
                    text: "Consent - "+reqParams.consentId+" Successfully Revoked",
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    window.location.reload(true)
                });

            }
            else{
                swal({
                    title: "Operation Failed",
                    text: "Consent - "+reqParams.consentId+" Failed to Revoke",
                    icon: "error",
                    button: "Okay",
                });
            }
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Consent "+reqParams.consentId+" Failed to Revoke",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const consentExtendHandler = async (reqParams) => {
        try {
            const response = await ConsentRequestService.consentExtend(reqParams)
            if (response) {
                swal({
                    title: "Operation Successfull",
                    text: "Consent - "+reqParams.consentId+" Successfully Extended for "+reqParams.duration+" Days.",
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    window.location.reload(true)
                });

            }
            else{
                swal({
                    title: "Operation Failed",
                    text: "Consent - "+reqParams.consentId+" Failed to Extend",
                    icon: "error",
                    button: "Okay",
                });
            }
        }
        catch (exception) {
            swal({
                title: "Operation Failed",
                text: "Consent "+reqParams.consentId+" Failed to Extend",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleRevoke = param => event => {
        event.preventDefault()
        // console.log(param);
        swal({
            title: "Are you sure to Revoke Consent - " + param.consentId + " ? ",
            text: "Your Data will be Not Accessible to the Doctor once you proceed...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    consentRevokeHandler(param);
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }
    const handleExtend = param => event => {
        event.preventDefault()
        // console.log(param);
        swal({
            title: "Are you sure to Extend Consent - " + param.consentId + " ? ",
            text: "Your Data will be Accessible to the Doctor upto the "+param.duration+" Days",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    consentExtendHandler(param);
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }
    
    

    return (
        <tr className='tableRow'>
            <td>{index + 1}</td>
            <td>{consentId} </td>
            <td>{consentRequestId}</td>
            <td>{doctorId} - {doctorName}</td>
            <td>{(consentType === 1)? "Delegatable" : "Non-Delegatable"}</td>
            <td>
                <input type='number' min={1} max={60} className='InputText' required value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
                <button type="button" className="btnAccept" onClick={handleExtend({consentId: consentId, duration: duration})}>Extend <BiRightArrow size={10}/></button>
                
            </td>
            <td>
                {
                    <button type="button" className="btnReject" onClick={handleRevoke({consentId: consentId})}>Revoke <BiRightArrow size={10}/></button> 
                }
                
            </td>
        </tr>
    )
}

export default ActiveConsent