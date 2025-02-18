
import Navbar from './layouts/NavBar'
import './App.css'
import { useMyContext } from './context/MyContext';
import { MyProvider } from './context/MyContext';
import Login from './sections/Login';
import Home from './sections/Home';
import LoginModal from './layouts/LoginModal';
import OtpRegister from './layouts/OtpRegister';
import SignupModal from './layouts/SignupModal';
import OtpVerification from './layouts/OtpVerification';
import { useEffect } from 'react';
import useTokenHandler from './hooks/useTokenHandler';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}


const Main: React.FC = () => {
  const { toggleModals,setIsAuthenticated } = useMyContext();
  useTokenHandler();

  

  
  return (

    <>
      <Navbar />
      {toggleModals.toggleLogin && (
        <Login />
      )}

      {toggleModals.toggleLoginModal && (
        <LoginModal/> 
      )}

      {toggleModals.toggleEmailModal && (
        <OtpVerification/> 
      )} 

      {toggleModals.toggleSignup && (
        <SignupModal />
      )}
      {toggleModals.toggleRegister && (
        <OtpRegister />
      )}

      <Home />




    </>

  )
}

export default App
