import React, { useState } from "react";
import dogl from "../assets/dogl.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendarCheck, faBars, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useMyContext } from "../context/MyContext";
import { motion } from "framer-motion";
import { logOut } from "../services/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setToggleModals, isAuthenticated, setIsAuthenticated, details } = useMyContext();
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const nav = useNavigate();
  const showLogin = () => setToggleModals((prev: { toggleLogin: any }) => ({
    ...prev,
    toggleLogin: true,
  }));

  const {role, changeRole} = useRole();

  const goToLanding = () => {
    nav('/landing-vet')
  }


  const handleLogout = async () => {
    try {
      const response = await logOut();
      if (response?.status === 200) {
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
        setShowDropdown(false);
        nav('/');
      }

    } catch (error: any) {
      alert("Something went wrong. Please try again later")
    }


  }

  return (
    <nav className="bg-customWhite">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={dogl} className="h-14" alt="Vetical Logo" />
          <span className="self-center text-xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent font-bold whitespace-nowrap">Vetical</span>
        </a>

        <div className="flex items-center space-x-4 md:order-2 pr-12">
          {isAuthenticated ? (
            <>
          
              <div className="w-10 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-orange-500 transition duration-200 hover:text-white">
                <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
              </div>

              <div className="hidden md:block">
                {details.is_veterinarian ? (
                
                  <div
                    onClick={changeRole}
                    className="font-medium rounded-lg hover:bg-gray-200 text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    {role === "User" ? "Switch to Veterinarian": "Switch to Pet Owner"} 
                  </div>
                ) : (
                  <>
                 
                    <div
                      onClick={goToLanding}
                      className="font-medium rounded-lg hover:bg-gray-200 text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out cursor-pointer"
                    >
                      Vet Your Clinic
                    </div>
                  </>
                )}
              </div>

            </>
          ) : null}


          <div className="md:hidden">
            <button className="p-2 rounded-full hover:bg-gray-200 transition duration-200">
              <FontAwesomeIcon icon={faCalendarCheck} className="w-6 h-6" />
            </button>
          </div>


          {isAuthenticated ? (
            <div className="relative">
              {/* Container with border and shadow to look like a button */}
              <div
                className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-300 rounded-3xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={toggleDropdown}
              >

                <FontAwesomeIcon icon={faBars} className="text-gray-600 w-3 h-3" />


                <div className="w-7 h-7 bg-gray-400 text-white flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faUser} className="w-3 h-3" />
                </div>
              </div>

              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg overflow-hidden z-50 shadow-[0_4px_10px_rgba(0,0,0,0.15),0_-4px_10px_rgba(0,0,0,0.15),4px_0_10px_rgba(0,0,0,0.15),-4px_0_10px_rgba(0,0,0,0.15)]"
                >
                  <Link to="/account"

                    className=" px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Account
                  </Link>
                  <button
                    className="w-full text-gray-700 cursor-pointer hover:bg-gray-100 flex items-center px-4 py-3"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <button
              onClick={showLogin}
              className="text-white border-2 cursor-pointer border-orange-500 bg-orange-500 font-medium rounded-lg text-sm hidden md:block px-4 py-2 text-center transition-all duration-300 ease-in-out hover:bg-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-orange-600 to-orange-400"
            >
              Login
            </button>
          )}


        </div>

        <div className="pl-40 items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border text-slate-900 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {["Clinics", "Veterinarians"].map((item) => (
              <li key={item}>
                <a href="#" className="block py-2 px-3 md:p-0 rounded md:bg-transparent hover:text-orange-500 transition duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
