import { api1 } from "./axiosConfig";
import { OtpDetails } from "../constants/interfaces/AuthInterface";
import { Register } from "../constants/interfaces/AuthInterface";
interface loginDetails {
    email:string;
    password:string;
}



export const loginAuth = async (data: loginDetails ) => {
    try {
      const response = await api1.post("/login/", {data:data}); 
      return response; 
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    }
};


export const registerUser = async(userDetails: Register) => {
  try {
    const response = await api1.post("/register/", {
      data: userDetails
    }); 
    return response; 
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
};

export const verifyLogin = async(otpData:OtpDetails) => {

  try {
    const response = await api1.post("/verify/", {
      data: otpData,
    }); 
    return response; 
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
}
  
export const verifyOtp = async(otpData:OtpDetails) => {

  const storedDetails = sessionStorage.getItem("registerDetails");
  const userDetails = storedDetails ? JSON.parse(storedDetails) : null;
  try {
    const response = await api1.post("/register/verify/", {
      data: otpData,
      details: userDetails
    }); 
    return response; 
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
}