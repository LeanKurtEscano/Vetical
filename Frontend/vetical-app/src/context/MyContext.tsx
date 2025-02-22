import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserDetails } from '../services/auth';
import { UserDetails } from '../constants/interfaces/AuthInterface';

interface Details {
  email:string
  is_veterinarian: boolean;
}

interface HandleModal {
  toggleLogin: boolean;
  toggleLoginModal: boolean;
  toggleEmailModal: boolean;
  toggleSignup: boolean;
  toggleRegister: boolean;
}


const MyContext = createContext<any>(null);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toggleModals , setToggleModals] = useState<HandleModal> ({
    toggleLogin: false,
    toggleEmailModal: false,
    toggleLoginModal:false,
    toggleSignup: false,
    toggleRegister: false,
  })
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState(() => {
   
    return localStorage.getItem("role") || "User";
  });
  const [details, setDetails] = useState<Details>({
    email: "",
    is_veterinarian: false
  })
  
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetchUserDetails(); 
        setDetails({
          email: response.email, 
          is_veterinarian: response.is_veterinarian
        }); 
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if(isAuthenticated){
      getDetails();
     
    }
    
  }, [isAuthenticated]);

  

  useEffect(() => {
  
    localStorage.setItem("role", role);
  }, [role]);
  
 



  return (
    <MyContext.Provider value={{ isAuthenticated,toggleModals,setToggleModals,details, setDetails, setIsAuthenticated, role, setRole}}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
