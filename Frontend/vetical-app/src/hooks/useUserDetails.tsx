import { useQuery } from '@tanstack/react-query'
import { UserDetails } from '../constants/interfaces/AuthInterface';
import { useEffect } from 'react';
import { fetchUserDetails } from '../services/auth'
const useUserDetails = () => {
    const { data, isLoading, isError, error } = useQuery<UserDetails>(['userDetails'], fetchUserDetails);

    
   
    useEffect(() => {
        if (data?.id) {
            localStorage.setItem("userId", data.id.toString());
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