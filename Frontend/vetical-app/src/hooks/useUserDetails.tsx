import { useQuery } from '@tanstack/react-query'
import { UserDetails } from '../constants/interfaces/AuthInterface';
import { useEffect } from 'react';
import { fetchUserDetails } from '../services/auth'
const useUserDetails = () => {
    const { data, isLoading, isError, error } = useQuery<UserDetails>(['userDetails'], fetchUserDetails);

    
   
    useEffect(() => {
        if (data?.id) {
            sessionStorage.setItem("userId", data.id.toString());
            sessionStorage.setItem("email", data.email);
            sessionStorage.setItem("birthdate", data.birthdate);
            sessionStorage.setItem("age", data.age);
            sessionStorage.setItem("lat", data.latitude.toString());  
            sessionStorage.setItem("long", data.longitude.toString());  
            sessionStorage.setItem("age", data.age);
        }
    }, [data]); 

    return {
        userDetails: data,
        isLoading,
        isError,
        error
    }

}

export default useUserDetails