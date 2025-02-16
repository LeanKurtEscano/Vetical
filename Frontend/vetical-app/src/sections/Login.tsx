import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GoogleButton from '../components/Googlebutton';
import { useMyContext } from '../context/MyContext';

const Login: React.FC = () => {
  const { setToggleModals } = useMyContext();
  const [loading, setLoading] = useState(false);

  const closeLogin = () => {
    setToggleModals((prev: { toggleLogin: any; }) => ({
      ...prev,
      toggleLogin: false,


    }))
    console.log("dasdsda");
  }

  const showSignup = () => {
    setToggleModals((prev: { toggleSignup: any; }) => ({
      ...prev,
      toggleSignup: true,


    }))
    setToggleModals((prev: { toggleLogin: boolean }) => ({
      ...prev,
      toggleLogin: false,
    }));
  }



  const showLoginModal = () => {
    setToggleModals((prev: { toggleLoginModal: any; }) => ({
      ...prev,
      toggleLoginModal: true
    }))

    setToggleModals((prev: { toggleLogin: any; }) => ({
      ...prev,
      toggleLogin: false

    }))
  }
  return (
    <section className="h-screen w-full fixed inset-0 flex justify-center items-center bg-gray-500/50  z-50">
      <div className=" flex flex-col p-6 bg-white border-1 border-amber-500 rounded-lg shadow-2xl w-[500px]">

        <div className="cursor-pointer mb-2" onClick={closeLogin}>
          <FontAwesomeIcon icon={faTimes} className="text-gray-500 text-base" />
        </div>


        <GoogleButton />


        <div className="flex items-center justify-center flex-row mb-2">
          <p className="text-center text-slate-600 mr-1">or</p>
        </div>


        <div className="flex flex-col">
          <button
            onClick={showLoginModal}
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
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5z"></path>
                </svg>
                Loading...
              </>
            ) : (
              "Log in"
            )}
          </button>
          <button
          onClick={showSignup}
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
