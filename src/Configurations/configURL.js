// All the Service URL's are to be included here...
let ipAddress = "172.16.131.147"
let portNumber = 6989;
const configURL = {
    loginURL: `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    registerURL: `http://${ipAddress}:${portNumber}/api/auth/register`,
    consentRequestURL: `http://${ipAddress}:${portNumber}/Request_List`,
    consentResponseURL: `http://${ipAddress}:${portNumber}/response`,
    sendOtpURL: `http://${ipAddress}:${portNumber}/api/auth/gs_otp`,
    validateOtpURL: `http://${ipAddress}:${portNumber}/api/auth/validate_otp`,
    ehrReqURL: `http://${ipAddress}:${portNumber}/get_records`
};
export default configURL;