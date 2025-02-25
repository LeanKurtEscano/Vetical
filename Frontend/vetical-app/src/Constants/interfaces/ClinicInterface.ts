export interface ClinicRegistration {
    clinicName: String;
    email:String;
    openingHours:String;
    closeHours:String;
    latitude:number;
    longitude: number;
    country:String
    unit?:String;
    building?:String;
    streetAddress: String;
    barangay:String;
    city:String;
    zipCode:String;
    province:String;
    selectedServices: number[];
    images: File[]
} 


export interface ClinicImageData {
  id: number;
  images: string[];
  uploaded_at: string;
  clinic: number;
  location: String;
  formatted_date: String;
}
{/*  unit: "",
  building: "",
  streetAddress: "",
  barangay: "",
  city: "",
  zipCode: "",
  province: "",
  country: "Philippines - PH", */}
 
 