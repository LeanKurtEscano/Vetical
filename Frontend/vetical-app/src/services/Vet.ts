
import { vetApi } from "./axiosConfig"
import { FormDatas } from "../constants/interfaces/VetInterface";
import { ClinicImageData } from "../constants/interfaces/ClinicInterface";


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



export const getClinicData = async () => {
  try {
    const response = await vetApi.get("/vet/clinics/");
     

    return response;
  } catch (error) {
    console.error("Error submitting clinic registration:", error);
    throw new Error("Failed to submit clinic registration");
  }
};


export const getClinicImages = async (): Promise<ClinicImageData[]> => {
  try {
    const response = await vetApi.get("/clinic/images/");
    return response.data ?? []; 
  } catch (error) {
    console.error("Error fetching clinic images:", error);
    return []; 
  }
};


export const deleteData = async (id: number) => {
  const response = await vetApi.delete(`/clinic/${id}/`);
  return response;
};

export const getClinicDetails = async (id: string) => {
  try {
    const response = await vetApi.get(`/clinic/${id}/`);
    return response.data ?? []; 
  } catch (error) {
    console.error("Error fetching clinic images:", error);
    return []; 
  }
};



export const updateClinicDetails = (id:number, data:any) => {

}

export const uploadClinicImage = async(id:string, data:FormData) => {
  const response = await vetApi.post(`/clinic/${id}/upload/`,
    data
    , {
    headers: {
      "Content-Type": "multipart/form-data", 
    }
  }
    
  );
  return response
     
   
}


export const deleteClinicImage = async(id:number) => {
  const response = await vetApi.delete(`/clinic/${id}/`);
  return response;
}