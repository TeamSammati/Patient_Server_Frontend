import React, {useState} from 'react'
import './Stylesheets/ConsentRequest.css'
import consentResponseService from '../Services/ConsentResponseService'
import swal from 'sweetalert';
import ConsentPopup from './ConsentPopup'
const ConsentRequest = ({ consentRequestId, index, hospitalId, doctorId, hospitalName, doctorName, purpose }) => {
    const [popUp, setPopUp] = useState(false);
    const consentResponseHandler = async (cr_response) => {
        try {
            const response = await consentResponseService.consentResponse(cr_response)
            if (response) {
                alert("Consent Response Given!", response)
                window.location.reload(true)

            }
        }
        catch (exception) {
            console.log("Failed to give Consent response")
        }
    }

    const handleConsentResponseAccept = (event) => {
        event.preventDefault()
        const cr_response = {
            crid: consentRequestId, status: 1
        }
        swal({
            title: "Are you sure to give Consent?",
            text: "Your Health Data is Accessible to the Requested Doctor.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setPopUp(true)
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
                    consentResponseHandler(cr_response)
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
                <ConsentPopup trigger={popUp} closePopup={setPopUp}>
                    <h4>Granular Consent</h4>
                    <p>Tick your health records that can be viwed by Requested Doctor.</p>
                </ConsentPopup>
            </td>
            <td>
                <button type="button" className="btnReject" onClick={handleConsentResponseReject}>Deny &gt;&gt;</button>
            </td>
        </tr>
    )
}

export default ConsentRequest