import axios from 'axios'
import configURL from "../Configurations/configURL";

const {ehrReqURL} = configURL;

const getMyData = async (patient) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${ehrReqURL}?patientID=${patient.patientId}&reqType=${0}`, null, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    console.log(response)
    return response.data
}
const exportObject = { getMyData}

export default exportObject