import { api1 } from "./axiosConfig";


interface loginDetails {
    email:string;
    password:string;
}
export const loginAuth = async (data: loginDetails) => {
    try {
      const response = await api1.post("/login/", {data:data}); 
      return response; 
    } catch (error) {
      console.error("Login error:", error);
      throw error; 
    }
  };
  