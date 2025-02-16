
import Navbar from './layouts/NavBar'
import './App.css'
import { useMyContext } from './context/MyContext';
import { MyProvider } from './context/MyContext';
import Login from './sections/Login';
import Home from './sections/Home';
import LoginModal from './layouts/LoginModal';
import OtpVerification from './layouts/OtpVerification';
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main: React.FC = () => {
  const { toggleModals } = useMyContext();

  return (

    <>
      <Navbar />
      {toggleModals.toggleLogin && (
        <Login />
      )}

      {toggleModals.toggleLoginModal && (
        <OtpVerification />
      )}

      <Home />




    </>

  )
}

export default App
