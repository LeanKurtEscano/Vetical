import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../components/Googlebutton';
import { useMyContext } from '../context/MyContext';

const Login: React.FC = () => {
    const { setIsAuthenticated,toggleLog, setToggleLog } = useMyContext();
    const [loading, setLoading] = useState(false)

    const apiUrl = import.meta.env.VITE_API_URL;
  
    const closeLogin = () => {
        setToggleLog(!toggleLog);
    }
 
    return (
      <section className="h-screen w-full absolute  inset-0 flex justify-center items-center">
      <div className="relative flex flex-col p-6 z-20 border-1 border-amber-500 rounded-lg shadow-2xl w-96">
        <div className="cursor-pointer mb-2" onClick={closeLogin}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-500 text-base" />
        </div>
        <GoogleButton />
        <div className="flex items-center justify-center flex-row mb-2">
          <p className="text-center text-slate-600 mr-1">or</p>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-gradient-to-r cursor-pointer from-orange-600 to-orange-400 mt-2 text-white rounded p-2 hover:from-orange-600 hover:to-orange-800 transition duration-300 flex justify-center items-center"
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
          <button
            type="submit"
            className="mt-2 border-2 cursor-pointer border-gray-300 text-black rounded p-2 hover:bg-gradient-to-r hover:from-orange-600 hover:to-orange-400 hover:text-white transition duration-300 flex justify-center items-center"
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
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>
    </section>
    
    
    )
}

export default Login
