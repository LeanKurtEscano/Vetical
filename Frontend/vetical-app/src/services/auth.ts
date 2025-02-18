import { api1, apiToken } from "./axiosConfig";
import { OtpDetails } from "../constants/interfaces/AuthInterface";
import { Register } from "../constants/interfaces/AuthInterface";

interface loginDetails {
  email: string;
  password: string;
}



export const loginAuth = async(data: loginDetails) => {
  try {
    const response = await api1.post("/login/", { data: data });
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

export const verifyLogin = async(otpData: OtpDetails) => {

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

export const verifyOtp = async(otpData: OtpDetails) => {

  const storedDetails = sessionStorage.getItem("registerDetails");
  const userDetails = storedDetails ? JSON.parse(storedDetails) : null;
  try {
    const response = await apiToken.post("/register/verify/", {
      data: otpData,
      details: userDetails
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}


export const logOut = async()  => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
  
    if (!accessToken) {
      throw new Error("No access token found.");
    }

    const response = await apiToken.post("/logout/", {refresh: refreshToken},
     );

    return response;
  } catch (error) {
    console.error("Logout error:", error)
  }
}


import { UserDetails } from '../constants/interfaces/AuthInterface';

export const fetchUserDetails = async (): Promise<UserDetails> => {
  const response = await apiToken.get('/account/');
  return response.data; 
};