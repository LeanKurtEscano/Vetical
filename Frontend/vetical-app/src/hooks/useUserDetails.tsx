import { useQuery } from '@tanstack/react-query'
import { UserDetails } from '../constants/interfaces/AuthInterface';

import { fetchUserDetails } from '../services/auth'
const useUserDetails = () => {
    const { data, isLoading, isError, error } = useQuery<UserDetails>(['userDetails'], fetchUserDetails, {
        staleTime: 1000 * 60 * 60 * 24,   // Data fresh for 1 day
        cacheTime: 1000 * 60 * 60 * 24,   // Cache for 1 day
        refetchOnWindowFocus: false,      // Disable refetching on window focus
        refetchOnReconnect: false,        // Disable refetching on network reconnection
    });

    return {
        userDetails: data,
        isLoading,
        isError,
        error
    }

}

export default useUserDetails