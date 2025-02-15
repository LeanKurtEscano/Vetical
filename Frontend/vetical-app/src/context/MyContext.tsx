import React, { createContext, useState, useContext } from 'react';



interface UserDetails {
  username: string;
  email:string
}



const MyContext = createContext<any>(null);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
  })
  const [sessionExpired, setSessionExpired] = useState(false);
  const [toggleLog , setToggleLog] = useState(false);
  const [toggleSesh, setToggleSesh] = useState(false);




  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated,userDetails, setUserDetails, toggleLog , setToggleLog,sessionExpired,setSessionExpired,toggleSesh,setToggleSesh}}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
