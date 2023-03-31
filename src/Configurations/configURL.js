// All the Service URL's are to be included here...
const configURL = {
    loginURL : `http://172.16.131.147:6989/api/auth/authenticate`,
    registerURL : `http://172.16.131.147:6989/api/auth/register`,
    consentRequestURL : `http://172.16.131.147:6989/api/auth/Request_List`,
    consentResponseURL : `http://172.16.131.147:6989/response`,
    sendOtpURL : `http://172.16.131.147:6989/gs_otp`,
    validateOtpURL : `http://172.16.131.147:6989/validate_otp`,
    ehrReqURL : `http://172.16.131.147:6989/api/auth/get_records`
};
export default configURL;