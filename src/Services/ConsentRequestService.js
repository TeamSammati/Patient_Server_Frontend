import axios from 'axios'
import configURL from "../Configurations/configURL";

const {consentRequestURL} = configURL;

const getPendingRequests = async (patient) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    console.log(patient.patientId, token)
    const response = await axios.get(`${consentRequestURL}?patientId=${patient.patientId}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { getPendingRequests}

export default exportObject