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
{/*  unit: "",
  building: "",
  streetAddress: "",
  barangay: "",
  city: "",
  zipCode: "",
  province: "",
  country: "Philippines - PH", */}
 
 