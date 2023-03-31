import { useState, useEffect } from 'react';

function OtpValidationButtons({ onSubmit , setClearCredentials , clearCredentials }) {
  const [otp, setOtp] = useState('');

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(otp);
  };
  useEffect(() => {
    setOtp('');
    setClearCredentials(false);
  }, [clearCredentials])
  return (
    <div>
      <input type="password" value={otp} onChange={handleOtpChange} className='InputText' />
      <button onClick={handleSubmit} className='InputButton'>Validate</button>
    </div>
  );
}

export default OtpValidationButtons;
