// All the Service URL's are to be included here...
let ipAddress = "13.232.72.238"
// let ipAddress = "172.16.137.28"
let portNumber = 6989;
const configURL = {
    loginURL: `http://${ipAddress}:${portNumber}/api/auth/authenticate`,
    userURL: `http://${ipAddress}:${portNumber}/patient-details`,
    registerURL: `http://${ipAddress}:${portNumber}/api/auth/register`,
    consentRequestURL: `http://${ipAddress}:${portNumber}/request-list`,
    consentResponseDenyURL: `http://${ipAddress}:${portNumber}/response`,
    sendOtpURL: `http://${ipAddress}:${portNumber}/api/auth/gs-otp`,
    validateOtpURL: `http://${ipAddress}:${portNumber}/api/auth/validate-otp`,
    ehrReqURL: `http://${ipAddress}:${portNumber}/get-records`,
    consentResponseAcceptURL: `http://${ipAddress}:${portNumber}/send-consent-data`,
    consentValidationURL: `http://${ipAddress}:${portNumber}/validate-keys`,
    revokeConsentURL: `http://${ipAddress}:${portNumber}/revoke-consent`,
    extendConsentURL: `http://${ipAddress}:${portNumber}/extend-consent`,
    activeConsentsURL: `http://${ipAddress}:${portNumber}/active-consents`,

};
export default configURL;