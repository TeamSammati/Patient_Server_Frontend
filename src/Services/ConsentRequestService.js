import axios from 'axios'
import configURL from "../Configurations/configURL";

const {consentRequestURL, revokeConsentURL, extendConsentURL, activeConsentsURL} = configURL;

const getPendingRequests = async (patient) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    //console.log(patient.patientId, token)
    const response = await axios.get(`${consentRequestURL}?patientId=${patient.patientId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const getActiveConsents = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    //console.log(patient.patientId, token)
    const response = await axios.get(`${activeConsentsURL}?patientId=${reqParams.patientId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const consentRevoke = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${revokeConsentURL}?consentId=${reqParams.consentId}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}

const consentExtend = async (reqParams) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${extendConsentURL}?consentId=${reqParams.consentId}&days=${reqParams.duration}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getPendingRequests, consentRevoke, consentExtend, getActiveConsents}

export default exportObject