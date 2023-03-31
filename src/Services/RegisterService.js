import axios from "axios";
import configURL from "../Configurations/configURL";

const {registerURL} = configURL;

const register = async (registerContent) => {
    const response = await axios.post(registerURL, registerContent)
    return response.data
}
const exportObject = { register }
export default exportObject