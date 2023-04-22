import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const navigate = useNavigate();

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const generateOtp = () => {
    if (mobileNumber && role) {
      // Generate random 4 digit number
      const otp = Math.floor(Math.random() * 9000) + 1000;
      setGeneratedOtp(otp);
      console.log(`Generated OTP: ${otp}`);
    }
  };

  const handleOtpChange = (event) => {
    setEnteredOtp(event.target.value);
    setIsLoginDisabled(event.target.value !== generatedOtp.toString());
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`Logged in as ${role} with mobile number ${mobileNumber}`);
    const data = {
      mobileNumber: mobileNumber,
      role: role,
    };
    localStorage.setItem('data', JSON.stringify(data));
    navigate('/');
    setMobileNumber('');
    setRole('');
    setGeneratedOtp('');
  };

  return (
    <div className="flex flex-col justify-center mt-20 items-center border-solid">
      <form
        onSubmit={handleLogin}
        className="mb-4 p-7 bg-slate-200 border-2 border-black rounded-md shadow-md"
      >
        <div className="m-4">
          <label htmlFor="mobileNumber">Mobile number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            pattern="[0-9]{10}"
            placeholder="Enter Your Number..."
            className="block border-2 border-black rounded-md p-1.5 mt-1 w-full"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            required
          />
        </div>
        <div className="m-4">
          <label htmlFor="role">Select role</label>
          <select
            id="role"
            name="role"
            className="block border-2 border-black rounded-md p-1.5 mt-1 w-full"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="m-4">
          <button
            className="tracking-wide mb-2 bg-gradient-to-b from-green-200 to-sky-200 border-2 border-black text-black text-base rounded-lg block w-40 p-2"
            onClick={generateOtp}
            disabled={!mobileNumber || !role}
          >
            Generate OTP
          </button>
          {generatedOtp && (
            <div>
              <label htmlFor="otp">OTP</label>
              <input
                type="number"
                id="otp"
                name="otp"
                className="block border-2 border-black rounded-md p-1.5 mt-1 w-full"
                placeholder="Enter Valid Otp..."
                value={enteredOtp}
                onChange={handleOtpChange}
                required
              />
              <div className="mt-3">
                <button
                  className="tracking-wide mb-2 bg-gradient-to-b from-green-200 to-sky-200 border-2 border-black text-black text-base rounded-lg block w-40 p-2"
                  type="submit"
                  disabled={isLoginDisabled}
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
