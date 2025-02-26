import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getClinicDetails, updateClinicDetails, uploadClinicImage } from "../../services/Vet";
import Carousel from "../../components/Carousel";
const Clinic: React.FC = () => {
    const { clinicId } = useParams<{ clinicId?: string }>();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clinicProfile", clinicId],
        queryFn: () => (clinicId ? getClinicDetails(clinicId) : Promise.reject("No clinic ID")),
        enabled: !!clinicId,
        retry: 1,
    });

   
 
    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error fetching clinic details.</p>;

    return (
        <section className="w-full min-h-screen h-auto">
            <Carousel imageUrls = {data.image} />

        </section>
    );
};

export default Clinic;


