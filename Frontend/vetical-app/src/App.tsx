
import Navbar from './layouts/NavBar'
import './App.css'
import { useMyContext } from './context/MyContext';
import { MyProvider } from './context/MyContext';
import Login from './sections/Login';
import Home from './sections/Home';

function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}

const Main:React.FC = () => {
  const {toggleLog} = useMyContext();
  
  return (
  
    <>
    <Navbar />
    {toggleLog && (
      <Login />
    )}
    <Home />
    
    
   
   
    </>
    
  )
}

export default App
