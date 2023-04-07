// All the Service URL's are to be included here...
let ipAddress = "172.16.131.147"
let portNumber = 6989;
const configURL = {
    loginURL: `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    registerURL: `http://${ipAddress}:${portNumber}/api/auth/register`,
    consentRequestURL: `http://${ipAddress}:${portNumber}/request-list`,
    consentResponseDenyURL: `http://${ipAddress}:${portNumber}/response`,
    sendOtpURL: `http://${ipAddress}:${portNumber}/api/auth/gs-otp`,
    validateOtpURL: `http://${ipAddress}:${portNumber}/api/auth/validate-otp`,
    ehrReqURL: `http://${ipAddress}:${portNumber}/get-records`,
    consentResponseAcceptURL: `http://${ipAddress}:${portNumber}/send-consent-data`,
    consentValidationURL: `http://${ipAddress}:${portNumber}/validate-keys`
};
export default configURL;