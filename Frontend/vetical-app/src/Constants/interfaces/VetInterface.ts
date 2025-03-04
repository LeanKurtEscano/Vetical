
export interface Specialization {
  id: number;
  specialization: string;
}

export interface FormDatas {
  id?: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  clinic_address: string;
  years_of_experience: string;
  education: string;
  license_number: string;
  latitude: number;
  longitude: number;
  birthday: string;
  age: string;
  specializations: Specialization[];
}


export interface VetSpecializations {
  specializations: Specialization[];
}



