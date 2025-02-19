export interface Register {
 email:string,
 password:string,
 birthdate: string,
 age: string,
 confirmPassword: string,
 longitude: string,
 latitude: string
}

export interface OtpDetails {
    email:string;
    otpCode:string;
    password:String;
  
}

export interface UserDetails {
    id:number
    email:string; 
    birthdate: string;
    age: string;
    longitude: number;  
    latitude: number;    
}