import { useQuery } from '@tanstack/react-query'
import { UserDetails } from '../constants/interfaces/AuthInterface';

import { fetchUserDetails } from '../services/auth'
const useUserDetails = () => {
    const {data , isLoading, isError, error} = useQuery<UserDetails>(['userDetails'], fetchUserDetails);

    return {
        userDetails: data,
        isLoading,
        isError,
        error
    }

}

export default useUserDetails