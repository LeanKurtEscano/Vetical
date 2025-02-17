import React, { createContext, useState, useContext } from 'react';



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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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




  return (
    <MyContext.Provider value={{ isAuthenticated,toggleModals,setToggleModals, setIsAuthenticated,userDetails, setUserDetails}}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
