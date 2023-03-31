import React from 'react'
import './Stylesheets/ConsentRequest.css'
import consentResponseService from '../Services/ConsentResponseService'

const ConsentRequest = ({ consentRequestId, index, hospitalId, doctorId, hospitalName, doctorName, purpose}) => {
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
        consentResponseHandler(cr_response)
    }

    const handleConsentResponseReject = (event) => {
        event.preventDefault()
        const cr_response = {
            crid: consentRequestId, status: 2
        }
        consentResponseHandler(cr_response)
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
            </td>
            <td>
                <button type="button" className="btnReject" onClick={handleConsentResponseReject}>Deny &gt;&gt;</button>
            </td>
        </tr>
    )
}

export default ConsentRequest