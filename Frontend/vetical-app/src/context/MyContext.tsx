import React, { createContext, useState, useContext, useEffect } from 'react';



interface UserDetails {
  username: string;
  email:string
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
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
  })
  
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

  useEffect(() => {
  
    localStorage.setItem("role", role);
  }, [role]);
  
 



  return (
    <MyContext.Provider value={{ isAuthenticated,toggleModals,setToggleModals, setIsAuthenticated,userDetails, setUserDetails, role, setRole}}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
