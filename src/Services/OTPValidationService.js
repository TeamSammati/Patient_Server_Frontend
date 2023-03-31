import axios from "axios";
import configURL from "../Configurations/configURL";

const {sendOtpURL, validateOtpURL} = configURL;
const genOTP = async (genParam) => {
    const response = await axios.post(`${sendOtpURL}?phoneNumber=${genParam.phoneNumber}`)
    return response.data
}
const validateOTP = async (validationParam) => {
    const response = await axios.post(`${validateOtpURL}?phoneNumber=${validationParam.phoneNumber}&otp=${validationParam.message}`)
    return response.data
}
const exportObject = { genOTP, validateOTP }
export default exportObject