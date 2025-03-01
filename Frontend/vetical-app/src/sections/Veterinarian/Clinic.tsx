import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getClinicDetails, uploadClinicImage } from "../../services/clinic";
import { ImageData } from "../../constants/interfaces/ImageInterface";
import { cleanImageUrl } from "../../utils/images";
import { faArrowLeft, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingAnimation } from "../../components/LoadingAnimation";
import { deleteClinicImage } from "../../services/clinic";
import { useState } from "react";
import useModal from "../../hooks/useModal";
import DeleteModal from "../../components/DeleteModal";
const Clinic: React.FC = () => {
    const { clinicId } = useParams<{ clinicId?: string }>();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { toggle, handleCancel, toggleModal } = useModal();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["clinicProfile", clinicId],
        queryFn: async () => getClinicDetails(clinicId!),
        enabled: !!clinicId,
        retry: 1,
    });

    const deleteMutation = useMutation(deleteClinicImage, {
        onSuccess: () => {
            if (clinicId) queryClient.invalidateQueries(["clinicProfile", clinicId]);
        },
        onError: (error) => console.error("Error deleting clinic image:", error),
    });

    const uploadImageMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
            return uploadClinicImage(clinicId!, formData);
        },
        onSuccess: () => queryClient.invalidateQueries(["clinicProfile", clinicId]),
    });

    if (isLoading) return <LoadingAnimation />;
    if (isError || !data) return <p>Error fetching clinic details.</p>;

    const placeholderImage = "https://via.placeholder.com/300?text=No+Image";



    // Process clinic images
    const images: ImageData[] = data?.images?.length
        ? data.images.map((img: ImageData) => ({
            ...img,
            image: cleanImageUrl(img.image),
        }))
        : Array(5).fill({ id: -1, image: placeholderImage }); 

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        uploadImageMutation.mutate(file);
    };

    const handleSelectImage = (id: number) => {
        setSelectedId(id);
        toggleModal();
    };

    const handleDeleteImage = async () => {
        if (selectedId !== null) {
            await deleteMutation.mutateAsync(selectedId);
            setSelectedId(null);
            handleCancel();
        }
    };

    return (
        <section className="w-full min-h-screen h-auto flex flex-col relative">
            <div className="flex pl-12">
                <button
                    onClick={() => navigate('/manage-listings')}
                    className="flex items-center text-gray-600 cursor-pointer hover:text-black transition-all"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 mr-2" />
                    <span className="text-lg font-medium">Go back</span>
                </button>
            </div>

            <div className="w-[150px] absolute pt-8 right-48">
                <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer transition-all"
                >
                    <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Image</span>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>

            <div className="w-1/2 mb-3 pl-40 flex">
                <h1 className="font-bold text-4xl">{data.clinic_name}</h1>
            </div>


            <div className="grid grid-cols-3 pl-40 grid-rows-2 gap-2 max-w-6xl w-full">
               
                <div className="col-span-1 row-span-2 relative">
                    <img
                        src={images[0].image}
                        className="w-full h-full max-h-[500px] object-cover rounded-md"
                        alt="Main Image"
                    />
                    {data?.images?.length > 0 && (
                        <button
                            onClick={(e) => { handleSelectImage(images[0].id); e.stopPropagation(); }}
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-1.5 px-2 sm:px-3 cursor-pointer bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>

                {images.slice(1, 5).map((img, index) => (
                    <div key={img.id} className="relative w-80% h-40">
                        <img
                            src={img.image}
                            className="w-full h-full object-cover rounded-md"
                            alt={`Image ${index + 1}`}
                        />

                        {data?.images?.length > 0 && img.id !== -1 && (
                            <button
                                onClick={(e) => {
                                    handleSelectImage(img.id);
                                    e.stopPropagation();
                                }}
                                className="absolute top-2 right-2 p-1 sm:p-1.5 px-2 sm:px-3 cursor-pointer bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        )}

                  
                        {index === 3 && data?.images?.length > 5 && (
                            <button className="absolute inset-0 bg-gray-300 cursor-pointer flex items-center justify-center text-white text-lg font-bold rounded-md 
                            transition-all duration-300 ease-in-out hover:bg-gray-400">
                                Show all photos
                            </button>
                        )}
                    </div>
                ))}
            </div>

         
            {toggle && selectedId !== null && (
                <DeleteModal onCancel={handleCancel} onConfirm={handleDeleteImage} id={selectedId} />
            )}
        </section>
    );
};

export default Clinic;
