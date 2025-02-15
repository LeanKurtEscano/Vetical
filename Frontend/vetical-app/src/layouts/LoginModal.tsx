import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash,faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from '../context/MyContext';
import { Link } from 'react-router-dom';
import { loginAuth } from '../services/auth';
import logo from '../assets/dogl.png';


const LoginModal: React.FC = () => {
    const [show, setShow] = useState(false);
    const {  setToggleModals } = useMyContext();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

  
    const toggleIcon = () => {
        setShow(!show);
    };
  
    const closeLogin = () => {
      setToggleModals((prev: {toggleLoginModal: any;}) => ({
        ...prev,
        toggleLoginModal : false,
      }))
    }

    const loginSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setLoading(true);

      const data = {
        email:email,
        password: password
      }
        try {
            const response = await loginAuth(data);

            if (response.data.success) {
                console.log("success");
            }

        } catch (error: any) {
          setLoading(false);
      
          if (error.response) {
              const { data, status } = error.response;
      
              
              if (status === 401) {
                  setPasswordError(data.error);
                  return;
              }

              if (status === 404) {
                setEmailError(data.error);
                return;
            }
      
        
      
              if (status === 500) {
                  alert("Server error: Please try again later");
                  return;
              }
          } else {
              alert("Network error: Please check your connection");
          }
      }
      
        

    };

    return (
      <section className="h-screen w-full fixed inset-0 flex justify-center items-center bg-gray-500/50 z-50">
      <div className="relative flex flex-col p-6 z-20 border-amber-500 bg-white border-2 rounded-lg shadow-2xl w-96">
        <div className="cursor-pointer mb-2" onClick={closeLogin}>
              <FontAwesomeIcon icon={faTimes} className="text-gray-500 text-base" />
            </div>
        <div className="flex justify-center mb-3">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
    
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent  whitespace-nowrap">Welcome to Vetical</h2>
    
        <div className="flex items-center justify-center flex-row mb-2">

          <Link to="/signup">
            <p className="text-center bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent  whitespace-nowrap hover:underline">Sign up for an account?</p>
          </Link>
        </div>
    
        <form className="flex flex-col" onSubmit={loginSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-black">
              Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
              className="bg-white border border-gray-300   placeholder-gray-500 rounded p-2 w-full transition duration-300 focus:border-gray-500 focus:ring-0"

              autoComplete="off"
              placeholder="Enter your email"
            />
            {emailError && <div><p className="text-red-500">{emailError}</p></div>}
          </div>
    
          <div className="mb-2 relative">
            <label htmlFor="password" className="block mb-2 text-black">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              id="password"
              className="bg-white border border-gray-300   placeholder-gray-500    transition duration-300 rounded p-2 pr-10 w-full"
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              onClick={toggleIcon}
              className="absolute right-2 text-gray-400 top-1/2 pt-2 cursor-pointer"
            />
          </div>
    
          {passwordError && <div><p className="text-red-500">{passwordError}</p></div>}
    
          <button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-orange-600 to-orange-400 mt-2 text-white rounded p-2 hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>
    </section>
    
      
      

    )
}

export default LoginModal