import axios from "axios";
import configURL from "../Configurations/configURL";

const {consentResponseDenyURL, consentResponseAcceptURL, consentValidationURL} = configURL;

const consentResponseDeny = async (cr_response) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${consentResponseDenyURL}?crid=${cr_response.crid}&status=${cr_response.status}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const consentResponseAccept = async (cr_response) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(consentResponseAcceptURL, cr_response, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response
}

const validateConsent = async (cr_response) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    // console.log(patient.patientId, token)
    const response = await axios.get(`${consentValidationURL}?patientId=${cr_response.patientId}&otp=${cr_response.otp}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const exportObject = { consentResponseDeny, consentResponseAccept, validateConsent}
export default exportObject