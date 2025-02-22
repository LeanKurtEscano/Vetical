
import { vetApi } from "./axiosConfig"
import { FormDatas } from "../constants/interfaces/VetInterface";
export const fetchSpecializations = async () => {
  try {
    const response = await vetApi.get("/specializations/");
    return response.data;
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations"); 
  }
};

export const submitRegistration = async(data: FormDatas) => {
  try {
    const response = await vetApi.post("/register/vet/",{ data : data});
    return response;
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw new Error("Failed to fetch specializations"); 
  }
};

export const submitClinicRegistration = async (formData: FormData) => {
  try {
    console.log(formData);
    const response = await vetApi.post("/register/clinic/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response;
  } catch (error) {
    console.error("Error submitting clinic registration:", error);
    throw new Error("Failed to submit clinic registration");
  }
};


