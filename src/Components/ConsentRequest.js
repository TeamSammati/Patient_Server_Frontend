import React, { useState } from 'react'
import './Stylesheets/ConsentRequest.css'
import consentResponseService from '../Services/ConsentResponseService'
import swal from 'sweetalert';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
// import healthRecords from '../newHealthRecords.json'
import ConsentRecords from './ConsentRecords'
const ConsentRequest = ({ consentRequestId, index, hospitalId, doctorId, hospitalName, doctorName, purpose, user, healthRecords}) => {
    const [open, setOpen] = useState(false);
    const [otpValidation, setOtpValidation] = useState(false);
    const consentResponseDenyHandler = async (cr_response) => {
        try {
            const response = await consentResponseService.consentResponseDeny(cr_response)
            if (response) {
                swal({
                    title: "Operation Successfull",
                    text: "Request Successfully Denied!",
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    window.location.reload(true)
                });
            }
        }
        catch (exception) {
            console.log("Failed to Deny Consent Request");
        }
    }
    const consentResponseHandler = async (cr_response) => {
        try {
            const response = await consentResponseService.consentResponseAccept(cr_response)
            //console.log(cr_response);
            if (response.status === 200) {
                swal({
                    title: "Your consent is in Process, Please Enter OTP",
                    button: "Okay",
                });
                setOtpValidation(true);
                // setOpen(false);
                //window.location.reload(true);
            }
        }
        catch (exception) {
            console.log("Failed to Accept Consent")
        }
    }
    const consentValidationHandler = async (cr_response) => {
        try {
            const response = await consentResponseService.validateConsent(cr_response)
            if(response === -99){
                swal({
                    title: "Invalid OTP, Try Again",
                    icon: "error",
                    button: "Okay",
                });
            }
            else if(response) {
                swal({
                    title: "Operation Successfull",
                    text: "Consent Given Successfully, Your Consent Id: "+response,
                    icon: "success",
                    button: "Okay",
                })
                .then(()=>{
                    setOpen(false);
                setOtpValidation(false);
                    window.location.reload(true)
                });
            }
        }
        catch (exception) {
            swal({
                title: "Invalid Details, Try Again",
                icon: "error",
                button: "Okay",
            });
        }
    }
    const handleConsentResponseAccept = (event) => {
        event.preventDefault()
        
        swal({
            title: "Are you sure to give Consent?",
            text: "Your Health Data is Accessible to the Requested Doctor.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setOpen(true)
                    //consentResponseHandler(cr_response)
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }

    const handleConsentResponseReject = (event) => {
        event.preventDefault()
        const cr_response = {
            crid: consentRequestId, status: 2
        }
        swal({
            title: "Are you sure to Deny the Request?",
            text: "You will be no longer able to accept, once Confirmmed...",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    consentResponseDenyHandler(cr_response)
                } else {
                    swal("Yup !!! Safely Backtracked...");
                }
            });

    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{consentRequestId} </td>
            <td>{hospitalId} - {hospitalName}</td>
            <td>{doctorId} - {doctorName}</td>
            <td>{(purpose === null) ? "NA" : purpose}</td>
            <td>
                <button type="button" className="btnAccept" onClick={handleConsentResponseAccept}>Accept &gt;&gt;</button>
                <Modal open={open} onClose={() => setOpen(false)} setOpen={setOpen} closeOnOverlayClick={false}>
                    <h4 style={{textAlign:"left", color: "navy"}}>Granular Consent</h4>
                    <h5>Request: {consentRequestId} &ensp; &ensp; Doctor: {doctorId} - {doctorName}</h5>
                    <p style={{fontStyle:"italic", fontFamily:"cursive"}}>(*) Tick your health records that can be viewed by Requested Doctor.</p>
                    <ConsentRecords healthRecords={healthRecords} 
                    consentResponseHandler={consentResponseHandler} user={user} consentRequestId={consentRequestId} setOpen={setOpen}
                    setOtpValidation={setOtpValidation} otpValidation={otpValidation} consentValidationHandler={consentValidationHandler}
                    doctorId={doctorId}
                    />
                </Modal>
            </td>
            <td>
                <button type="button" className="btnReject" onClick={handleConsentResponseReject}>Deny &gt;&gt;</button>
            </td>
        </tr>
    )
}

export default ConsentRequest