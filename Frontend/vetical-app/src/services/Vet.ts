
import { vetApi } from "./axiosConfig"
import { FormData } from "../constants/interfaces/VetInterface";

export const fetchSpecializations = async () => {
  try {
    const response = await vetApi.get("/specializations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations"); 
  }
};

export const submitRegistration = async(data: FormData) => {
  try {
    const response = await vetApi.post("/register/vet/",{ data : data});
    return response;
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations"); 
  }
};
