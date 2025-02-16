import { api1 } from "./axiosConfig";


interface loginDetails {
    email:string;
    password:string;
}


export interface OtpDetails {
  email:string;
  otpCode:string;

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
  
export const verifyOtp = async(data:OtpDetails) => {
  try {
    const response = await api1.post("/verify/", {data:data}); 
    return response; 
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
}