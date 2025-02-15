import axios from "axios";

export const api1 = axios.create({
    baseURL: "http://localhost:8000/user", 
    headers: {
      "Content-Type": "application/json",
    },
  });