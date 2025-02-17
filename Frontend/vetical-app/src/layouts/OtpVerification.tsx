import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { verifyLogin } from "../services/auth";
import { useMyContext } from "../context/MyContext";
import { OtpDetails } from "../constants/interfaces/AuthInterface";
import email from "../assets/email.webp"
const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const { setToggleModals,setIsAuthenticated } = useMyContext();
  const [otpError, setOtpError] = useState("");

  const otpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || isNaN(Number(otp))) {
      setOtpError("Please enter a valid 6-digit OTP.");
      return;
    }

    const userEmail = sessionStorage.getItem("email") ?? "" ;
    
    
    const data:OtpDetails = {
      email: userEmail,
      otpCode: otp

    }
    try { 
      const response =  await verifyLogin(data);
      if(response.status === 200){
        setIsAuthenticated(true);
        setToggleModals((prev: { toggleEmailModal: any }) => ({
          ...prev,
          toggleEmailModal: false
        }))
      }
    } catch(error:any) {
      const { data, status } = error.response;
      switch (status) {
          case 400:
              setOtpError(data.error)
           
            break;
        
          case 404:
              setOtpError(data.error)
          
            break;
        
          default:
            alert("Please fill out the field");
          
            break;
      }
    }
  };


  const goBack = () => {
    setToggleModals((prev: { toggleLoginModal: any }) => ({
      ...prev,
      toggleLoginModal: true
    }))
    setToggleModals((prev: { toggleEmailModal: any }) => ({
      ...prev,
      toggleEmailModal: false
    }))

  }

  const closeOtpModal = () => {
    setToggleModals((prev: { toggleEmailModal: any }) => ({
      ...prev,
      toggleEmailModal: false
    }))
  }

  return (
    <section className="h-screen w-full fixed inset-0 flex justify-center items-center bg-gray-500/50 z-50">
      <div className="relative flex flex-col p-6 z-20 border-orange-500 bg-white border-2 rounded-lg shadow-2xl w-[500px]">

        <div className="flex justify-between items-center mb-4">
          <button onClick={goBack} className="text-gray-500 cursor-pointer hover:text-gray-700">
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
          </button>
          <button onClick={closeOtpModal} className="text-gray-500 cursor-pointer hover:text-gray-700">
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>


        <div className="flex justify-center mb-4">
          <img src={email} alt="Logo" className="h-20" />
        </div>


        <h2 className="text-xl font-semibold text-center">
          Enter the 6-digit OTP code sent to your email
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          We'll verify your account
        </p>


        <form className="flex flex-col mt-4" onSubmit={otpSubmit}>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            OTP Code:
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            id="otp"
            className="mt-1 bg-white border border-gray-300 rounded p-2 w-full text-center tracking-widest text-lg placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="••••••"
            maxLength={6}
            autoComplete="off"
          />
          {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 cursor-pointer bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Continue
          </button>
        </form>



      </div>
    </section>

  );
};

export default OtpVerification;
