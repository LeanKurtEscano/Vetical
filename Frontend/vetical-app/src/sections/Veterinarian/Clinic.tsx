import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClinicDetails } from "../../services/Vet";

const Clinic: React.FC = () => {
    const { clinicId } = useParams<{ clinicId?: string }>(); // Ensure clinicId can be undefined

    console.log("Clinic ID:", clinicId); // Debugging

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clinicProfile", clinicId], // Include clinicId to refetch data properly
        queryFn: () => clinicId ? getClinicDetails(clinicId) : Promise.reject("No clinic ID"),
        enabled: !!clinicId, // Prevents query from running if clinicId is undefined
        retry: 1, // Optional: Limits retries to avoid infinite fetch loops
    });
    
    console.log(data)


    return (
        <div>
            <h1>Clinic Profile</h1>
            <p>Here, you can find information about the clinic.</p>

            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: Unable to fetch clinic details</div>}

            {data && (
                <div>
                    <h2>{data.name}</h2>
                    <p>Address: {data.address}</p>
                    <p>Contact: {data.phone}</p>
                </div>
            )}
        </div>
    );
};

export default Clinic;
