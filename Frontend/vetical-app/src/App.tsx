
import Navbar from './layouts/NavBar'
import './App.css'
import { useMyContext } from './context/MyContext';
import { MyProvider } from './context/MyContext';
import Login from './sections/Login';
import Home from './sections/Home';
import LoginModal from './layouts/LoginModal';

import SignupModal from './layouts/SignupModal';
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
        <LoginModal/> 
      )}

      {toggleModals.toggleSignup && (
        <SignupModal />
      )}

      <Home />




    </>

  )
}

export default App
