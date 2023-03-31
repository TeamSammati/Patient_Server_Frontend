import axios from "axios";
import configURL from "../Configurations/configURL";

const {consentResponseURL} = configURL;

const consentResponse = async (cr_response) => {
    let token = window.localStorage.getItem('BearerToken')
    token=token.substring(1,token.length-1);
    const response = await axios.post(`${consentResponseURL}?crid=${cr_response.crid}&status=${cr_response.status}`, {
        headers: {
        'Authorization': `Bearer ${token}`
        }
       })
    return response.data
}
const exportObject = { consentResponse }
export default exportObject