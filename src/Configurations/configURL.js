// All the Service URL's are to be included here...
const configURL = {
    loginURL : `http://172.16.133.184/api/auth/authenticate`,
    registerURL : `http://172.16.133.184/api/auth/register`,
    consentRequestURL : `http://172.16.133.184/Request_List`,
    consentResponseURL : `http://172.16.133.184/response`,
    sendOtpURL : `http://172.16.133.184/api/auth/gs_otp`,
    validateOtpURL : `http://172.16.133.184/api/auth/validate_otp`,
    ehrReqURL : `http://172.16.133.184/get_records`
};
export default configURL;