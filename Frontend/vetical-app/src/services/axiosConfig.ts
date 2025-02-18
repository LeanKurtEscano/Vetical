import axios from "axios";

export const api1 = axios.create({
    baseURL: "http://localhost:8000/user", 
    headers: {
      "Content-Type": "application/json",
    },
  });



const accessToken = localStorage.getItem("access_token");

export const apiToken = axios.create({
  baseURL: "http://localhost:8000/user",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  },
});

  
  
  