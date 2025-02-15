import React, { useState } from 'react';
import dogl from '../assets/dogl.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { useMyContext } from '../context/MyContext';

const Navbar: React.FC = () => {
    const [toggleNav, setToggleNav] = useState(false);
    const { toggleLog, setToggleLog } = useMyContext();

    const showNav = () => setToggleNav(!toggleNav);
    const showLogin = () => setToggleLog(!toggleLog);

    return (
        <nav className="bg-customWhite shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={dogl} className="h-14" alt="Flowbite Logo" />
                    <span className="self-center text-xl bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent font-bold whitespace-nowrap">Vetical</span>
                </a>
                <div className="flex items-center space-x-4 md:order-2 pr-12"> 
                  
                <div className="w-10 h-10 rounded-full cursor-pointer flex justify-center items-center hover:bg-orange-500 transition duration-200 hover:text-white">
                        <FontAwesomeIcon icon={faBell} className="w-6 h-6" />
                    </div>

                  
                    <div className='md:hidden text-slate-950 cursor-pointer' onClick={showNav}>
                        <FontAwesomeIcon icon={toggleNav ? faTimes : faBars} className='text-lg pt-4 pb-4' />
                    </div>

                
                    <button
                        onClick={showLogin}
                        className="text-white border-2 cursor-pointer border-orange-500 bg-orange-500 font-medium rounded-lg text-sm hidden md:block px-4 py-2 text-center transition-all duration-300 ease-in-out hover:bg-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-orange-600 to-orange-400">
                        Login
                    </button>
                </div>

                {/* Navbar Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border text-slate-900 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        {["Clinics", "Products", "Services", "Contact"].map((item) => (
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
}

export default Navbar;
