import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClinicDetails } from "../../services/Vet";
import { ImageData } from "../../constants/interfaces/ImageInterface";
import { cleanImageUrl } from "../../utils/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Clinic: React.FC = () => {
    const { clinicId } = useParams<{ clinicId?: string }>();
    const navigate = useNavigate(); // Initialize navigation

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clinicProfile", clinicId],
        queryFn: () => (clinicId ? getClinicDetails(clinicId) : Promise.reject("No clinic ID")),
        enabled: !!clinicId,
        retry: 1,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data || !data.images) return <p>Error fetching clinic details.</p>;

    // Mock image URLs if none are provided (for layout testing)
    const mockImages = [
        "https://via.placeholder.com/500",
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/150",
    ];

    // Ensure we have images (use mock data if empty)
    const images: string[] = data.images.length
        ? data.images.map((item: ImageData) => cleanImageUrl(item.image))
        : mockImages;

    // Duplicate images to see many in the layout
    const doubledImages = [...images, ...images, ...images];

    return (
        <section className="w-full min-h-screen h-auto flex flex-col ">
            {/* Go Back Button */}
          <div className="flex pl-12 ">
          <button
                    onClick={() => navigate(-1)} // Navigate back
                    className="flex items-center text-gray-600 cursor-pointer hover:text-black transition-all"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 mr-2" />
                    <span className="text-lg font-medium">Go back</span>
                </button>
          

          </div>
               

            {/* Title */}
            <div className="w-1/2 pl-40 flex">
                <h1 className="font-bold text-4xl">{data.clinic_name}</h1>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-3 pl-40 grid-rows-2 gap-2 max-w-6xl w-full">
                {/* Large Main Image */}
                <div className="col-span-1 row-span-2">
                    <img src={doubledImages[0]} className="w-full h-full max-h-[500px] object-cover rounded-md" alt="Main Image" />
                </div>

                {/* Smaller Images (2x2) */}
                {doubledImages.slice(1, 5).map((img, index) => (
                    <div key={index} className="relative w-80% h-40">
                        <img src={img} className="w-full h-full object-cover rounded-md" alt={`Image ${index + 1}`} />

                        {index === 3 && doubledImages.length > 5 && (
                            <button className="absolute inset-0 bg-gray-300 cursor-pointer flex items-center justify-center text-white text-lg font-bold rounded-md 
                                transition-all duration-300 ease-in-out hover:bg-gray-400">
                                Show all photos
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Clinic;
