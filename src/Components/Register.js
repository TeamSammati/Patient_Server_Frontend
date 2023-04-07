import React, { useEffect, useState } from 'react'
import './Stylesheets/Register.css'
import OtpValidationButtons from './OtpValidationButtons'
import registerService from '../Services/RegisterService'
import otpValidationService from '../Services/OTPValidationService'
const Register = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [dob, setDob] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState(0)
  const [address1, setAddress1] = useState('')
  const [pin, setPIN] = useState('')
  const [state, setState] = useState(0)
  const [passPhoto, setPassPhoto] = useState(``)
  const [uid, setUid] = useState('')
  const [uidType, setUidType] = useState(0)
  const [uName, setUName] = useState('')
  const [pwd, setPwd] = useState('')
  const [rpwd, setRPwd] = useState('')
  const [clearCredentials, setClearCredentials] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [wantToValidate, setWantToValidate] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = btoa(
        new Uint8Array(reader.result)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      setPassPhoto(`data:image/png;base64,${base64}`);
    };

    reader.readAsArrayBuffer(file);
  };
  const handleSendOtp = () => {
    const genParam = {
      phoneNumber: mobile
    }
    setWantToValidate(true)
    sendOtpHandler(genParam)
  }
  const sendOtpHandler = async (genParam) => {
    try {
      const response = await otpValidationService.genOTP(genParam)
      if (response) {
        alert("OTP Sent to your Mobile Number");
      }
      else {
        alert("Invalid Details! Try Again.");
      }
    }
    catch (exception) {
      alert("Cannot Send Details Please try later...")
    }
  }
  const handleOtpSubmit = (enteredOtp) => {
    const validationParam = {
      phoneNumber: mobile,
      message: enteredOtp
    }
    otpHandler(validationParam)
    //console.log('Entered OTP is : ', validationParam);
  };
  const otpHandler = async (validationParam) => {
    try {
      const response = await otpValidationService.validateOTP(validationParam)
      if (response) {
        setIsOtpValidated(true);
      }
      else {
        alert("Invalid OTP! Try Again.");
        setClearCredentials(true);
      }
    }
    catch (exception) {
      alert("Cannot Send OTP Please try later...")
    }
  }
  const genderList = [
    {
      id: 1,
      value: 'Male'
    }, {
      id: 2,
      value: 'Female'
    }, {
      id: 3,
      value: 'Others'
    }
  ];
  const stateList = [
    {
      id: 1,
      value: 'Andhra Pradesh'
    }, {
      id: 2,
      value: 'Gujarat'
    }, {
      id: 3,
      value: 'Maharastra'
    },
    {
      id: 4,
      value: 'Telangana'
    }, {
      id: 5,
      value: 'Karnataka'
    }, {
      id: 6,
      value: 'Others'
    }
  ];
  const uidTypeList = [
    {
      id: 1,
      value: 'Aadhar'
    }, {
      id: 2,
      value: 'Voter Id.'
    }, {
      id: 3,
      value: 'PAN'
    }
  ];
  function Options({ options }) {
    return (
      options.map(option =>
        <option key={option.id} value={option.value}>
          {option.value}
        </option>)
    );
  }

  useEffect(() => {
    console.log("Register: ", fname, ' ', gender, ' ', uid, ' ', uidType)
  }, [fname, gender, uid, uidType])

  const registerHandler = async (registerContent) => {
    try {
      const response = await registerService.register(registerContent)
      if (response) {
        alert("Registration Successful! You can Login Now...", response)
      }
      window.location.reload(true)
    }
    catch (exception) {
      alert("Registration Failed...")
      window.location.reload(true)
    }
  }
  const handleRegister = (event) => {
    event.preventDefault()
    const registerContent = {
      firstName: fname, lastName: lname, phoneNumber: mobile, userName: uName, gender: gender, email: email, uidNumber: uid, uidType: uidType, state: state, address: address1, pinCode: pin, password: pwd, DOB: dob, passPhoto: passPhoto
    }
    if (gender === 0 || state === 0 || uidType === 0) {
      alert("select All Fields and Try Again!");
      return
    }
    if (pwd !== rpwd) {
      alert("Password do not match, Try Again!");
      setPwd('')
      setRPwd('')
      return
    }
    if (pwd.length < 8 || pwd.length > 32) {
      alert("Password Length should be in range [8,32], Try Again!");
      setPwd('')
      setRPwd('')
      return
    }
    if (uName.length > 10) {
      alert("User Name length should be at max 10 characters..., Try Again!")
      setUName('')
      return
    }
    //console.log("Registration: ", registerContent)
    registerHandler(registerContent)


    setFname('')
    setLname('')
    setDob('')
    setMobile('')
    setEmail('')
    setGender(0)
    setAddress1('')
    setPIN('')
    setState(0)
    setPassPhoto(null)
    setUid('')
    setUidType(0)
    setUName('')
    setPwd('')
    setRPwd('')
  }

  return (
    <div className='RegisterPage'>
      <div className='RegisterTitle'>Public (Patient) Self Registration Form</div>
      <div className='RegisterContainer'>
        <form onSubmit={handleRegister}>
          <div className='RegisterSection1'>
            <h4>Get Started!</h4>
            <div className='RegisterRow'>
              <div className='RegisterCol'>
                <label className='InputLabel'>First Name (*)</label>
                <input
                  type='text'
                  className='InputText'
                  value={fname}
                  onChange={event => setFname(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Last / Sur Name (*)</label>
                <input
                  type='text'
                  className='InputText'
                  value={lname}
                  onChange={event => setLname(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Date of Birth (*)</label>
                <input
                  type='date'
                  className='InputText'
                  value={dob}
                  onChange={event => setDob(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className='RegisterRow'>
              <div className='RegisterCol'>
                <label className='InputLabel'>Mobile No. (*)</label>
                <input
                  type='text'
                  className='InputText'
                  value={mobile}
                  onChange={event => setMobile(event.target.value)}
                  disabled={isOtpValidated}
                  required
                />
                {isOtpValidated ? (
                  <h5 className='success'>OTP has been validated!</h5>
                ) : (
                  <div>
                    {
                      wantToValidate ? (
                        <div>
                          <h5 className='info'>Please enter the OTP sent to your Mobile Number:</h5>
                          <OtpValidationButtons onSubmit={handleOtpSubmit} clearCredentials={clearCredentials} setClearCredentials={setClearCredentials} />
                        </div>
                      ) : (
                        <div>
                          {(mobile.length >= 10) && <input type="button" className='InputButton' value="Send OTP" onClick={handleSendOtp} disabled={mobile.length < 10} />}
                        </div>
                      )
                    }
                  </div>
                )}
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Email Id. (*)&emsp;&emsp;&emsp;&nbsp;</label>
                <input
                  type='email'
                  className='InputText'
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Gender (*)&emsp;&emsp;&nbsp;</label>
                <select
                  name="gender"
                  className="InputText"
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  required>
                  <option value="0" disabled>select your gender</option>
                  <Options options={genderList} />
                </select>
              </div>
            </div>
            <div className='RegisterRow'>
              <div className='RegisterCol'>
                <label className='InputLabel'>Address (*)&emsp;</label>
                <input
                  type='text'
                  className='InputText'
                  value={address1}
                  onChange={event => setAddress1(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Area / PIN (*) &emsp;&emsp;&nbsp;</label>
                <input
                  type='text'
                  className='InputText'
                  value={pin}
                  onChange={event => setPIN(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>State (*)&emsp;&emsp;&emsp;</label>
                <select
                  name="state"
                  className="InputText"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required>
                  <option value="0" selected disabled hidden>select your state</option>
                  <Options options={stateList} />
                </select>
              </div>
            </div>
            <div className='RegisterRow'>
              <div className='RegisterCol'>
                <label className='InputLabel'>PassPhoto</label>
                <input
                  type='file'
                  className='InputText'
                  onChange={handleImageChange}
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Unique ID. No. (*)&nbsp;</label>
                <input
                  type='text'
                  className='InputText'
                  value={uid}
                  onChange={event => setUid(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>UID. Type (*)&emsp;</label>
                <select
                  name="uidType"
                  className="InputText"
                  value={uidType}
                  onChange={e => setUidType(e.target.value)}
                  required>
                  <option value="0" selected disabled hidden>select UID. Type</option>
                  <Options options={uidTypeList} />
                </select>
              </div>
            </div>
          </div>
          <div className='RegisterSection2'>
            <h4>Set Login Credentials</h4>
            <div className='RegisterRow'>
              <div className='RegisterCol'>
                <label className='InputLabel'>Username (*)</label>
                <input
                  type='text'
                  className='InputText'
                  value={uName}
                  onChange={event => setUName(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>Password (*)</label>
                <input
                  type='password'
                  className='InputText'
                  value={pwd}
                  onChange={event => setPwd(event.target.value)}
                  required
                />
              </div>
              <div className='RegisterCol'>
                <label className='InputLabel'>ReType Password (*)</label>
                <input
                  type='password'
                  className='InputText'
                  value={rpwd}
                  onChange={event => setRPwd(event.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          {(isOtpValidated) && <button type='submit' className='InputButton' disabled={!isOtpValidated}>Submit &gt;&gt;</button>}
        </form>

      </div>
    </div>
  )
}

export default Register