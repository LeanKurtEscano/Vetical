import { jwtDecode } from "jwt-decode";
import { api1 } from "./axiosConfig";



const isTokenExpired = (token:string) => {
    const decoded: {exp:number} = jwtDecode(token);

    const tokenExpiration = decoded.exp;
    const currentTime = Date.now() / 1000;

    return tokenExpiration < currentTime
}


const refreshUserToken  = async() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if(!refreshToken) {
        return false
    }


    if(isTokenExpired(refreshToken)) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return false
    }


    try {
        const response =  await api1.post('/token/refresh/',{
            refresh: refreshToken
        })


        if(response.status === 200) {
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);;
            return true

        }

    } catch(error) { 
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return false
    }
}
export const userAuth = async():Promise<boolean> => {
        const accessToken = localStorage.getItem("access_token");
        if(!accessToken) {
            return false
        }


        if(isTokenExpired(accessToken)) {
            const response = await refreshUserToken();
            return response ?? false
        }

        return true
    }

