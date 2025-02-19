import Navbar from './layouts/NavBar';
import './App.css';
import { useMyContext } from './context/MyContext';
import { MyProvider } from './context/MyContext';
import Login from './sections/Login';
import Home from './sections/Home';
import LoginModal from './layouts/LoginModal';
import OtpRegister from './layouts/OtpRegister';
import SignupModal from './layouts/SignupModal';
import OtpVerification from './layouts/OtpVerification';
import useTokenHandler from './hooks/useTokenHandler';
import {  Routes, Route } from 'react-router-dom';
import Profile from './sections/Profile';
import VetLanding from './sections/Veterinarian/VetLanding';
import VetRegistration from './sections/Veterinarian/VetRegister';
import RoleBasedRoute from './Routes/RoleBaseRoute';
import VetDashboard from './sections/Veterinarian/VetDashboard';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const { toggleModals, setIsAuthenticated } = useMyContext();
  useTokenHandler();

  return (
 
      <>
        <Navbar />
        
        {toggleModals.toggleLogin && <Login />}
        {toggleModals.toggleLoginModal && <LoginModal />}
        {toggleModals.toggleEmailModal && <OtpVerification />}
        {toggleModals.toggleSignup && <SignupModal />}
        {toggleModals.toggleRegister && <OtpRegister />}

        
        <Routes>

                <Route
                    path="/"
                    element={
                        <RoleBasedRoute
                            petOwnerComponent={<Home />}
                            vetComponent={<VetDashboard />}
                        />
                    }
                />
          <Route path="/account" element={<Profile />} />
          <Route path="/landing-vet" element={<VetLanding />} />
          <Route path="/register-vet" element={<VetRegistration />} />
        </Routes>
      </>

  );
};

export default App;
