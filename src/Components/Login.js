import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [role, setRole] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('data'));
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
      alert(`Generated OTP: ${otp}`);
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
    toast.success('Login successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('data');
    setIsLoggedIn(false);
    toast.success('Logout successfully');
  };

  return (
    <>
      <div className="flex flex-col justify-center font-mono mt-20 items-center border-solid">
        {isLoggedIn ? (
          <div>
            <p className="text-2xl mb-3">
              Welcome, {JSON.parse(localStorage.getItem('data')).role} ! Are you
              sure you want to logout?
            </p>
            <button
              className="border-2 border-black p-4 w-36 text-2xl hover:bg-gray-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="img"
              />
            </div>
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form
                onSubmit={handleLogin}
                className="mb-4 p-10 bg-slate-200 rounded-md shadow-xl text-lg"
              >
                <label htmlFor="mobileNumber">Mobile number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  pattern="[0-9]{10}"
                  placeholder="Enter Your Number..."
                  className="block border border-black rounded-md p-1.5 mt-1 mb-2 w-full"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  required
                />
                <label htmlFor="role">Select role</label>
                <select
                  id="role"
                  name="role"
                  className="block border border-black rounded-md p-1.5 mt-1 w-full"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <button
                  className="tracking-wide mb-2 border-2 border-black text-black rounded-lg block w-40 p-2 mt-3"
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
                      className="block border border-black rounded-md p-1.5 mt-1 w-full"
                      placeholder="Enter Valid Otp..."
                      value={enteredOtp}
                      onChange={handleOtpChange}
                      required
                    />
                    <button
                      className="tracking-wide mb-2 border-2 border-black text-black rounded-lg block w-40 p-2 mt-3"
                      type="submit"
                      disabled={isLoginDisabled}
                    >
                      Login
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
export default LoginPage;
