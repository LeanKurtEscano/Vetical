import { clinicApi } from "./axiosConfig";
import { ClinicImageData } from "../constants/interfaces/ClinicInterface";

export const getClinicData = async () => {
  try {
    const response = await clinicApi.get("/vet/clinics/");
     

    return response;
  } catch (error) {
    console.error("Error submitting clinic registration:", error);
    throw new Error("Failed to submit clinic registration");
  }
};


export const getClinicImages = async (): Promise<ClinicImageData[]> => {
  try {
    const response = await clinicApi.get("/clinic/images/");
    return response.data ?? []; 
  } catch (error) {
    console.error("Error fetching clinic images:", error);
    return []; 
  }
};


export const deleteData = async (id: number) => {
  const response = await clinicApi.delete(`/clinic/${id}/`);
  return response;
};

export const getClinicDetails = async (id: string) => {
  try {
    const response = await clinicApi.get(`/clinic/${id}/`);
    return response.data ?? []; 
  } catch (error) {
    console.error("Error fetching clinic images:", error);
    return []; 
  }
};



export const updateClinicDetails = (id:number, data:any) => {

}

export const uploadClinicImage = async(id:string, data:FormData) => {
  const response = await clinicApi.post(`/clinic/${id}/upload/`,
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
  const response = await clinicApi.delete(`/clinic/image/${id}/`);
  return response;
}