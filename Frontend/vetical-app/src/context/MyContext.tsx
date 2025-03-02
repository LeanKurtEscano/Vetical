import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUserDetails } from '../services/auth';
import { ClinicRegistration } from '../constants/interfaces/ClinicInterface';
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
  const [clinicData, setClinicData] = useState<ClinicRegistration>(() => {
  
    const storedData = sessionStorage.getItem("clinicData");
    return storedData 
      ? { ...JSON.parse(storedData), images: [] } 
      : {
          clinicName: "",
          email: "",
          openingHours: "",
          closeHours: "",
          latitude: 0,
          longitude: 0,
          country: "",
          unit: "",
          building: "",
          streetAddress: "",
          barangay: "",
          city: "",
          zipCode: "",
          province: "",
          selectedServices: [],
          images: [],
      };
  });
 
  useEffect(() => {
    const { images, ...dataWithoutImages } = clinicData;
    sessionStorage.setItem("clinicData", JSON.stringify(dataWithoutImages));
  }, [clinicData]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState(() => {
  
    return localStorage.getItem("role") || "User";
  });


  const [details, setDetails] = useState<Details>({
    email: "",
    is_veterinarian: false
  })
  
  

  

  useEffect(() => {
  
    localStorage.setItem("role", role);
  }, [role]);
  
 



  return (
    <MyContext.Provider value={{ isAuthenticated,toggleModals,setToggleModals,details,clinicData, setClinicData, setDetails, setIsAuthenticated, role, setRole}}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
