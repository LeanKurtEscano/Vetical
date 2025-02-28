import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getClinicImages, deleteData } from "../../services/clinic";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingAnimation } from "../../components/LoadingAnimation";
import { ClinicImageData } from "../../constants/interfaces/ClinicInterface";
import useModal from "../../hooks/useModal";
import DeleteModal from "../../components/DeleteModal";
import { cleanImageUrl } from "../../utils/images";

export default function ManageListings() {
  const navigate = useNavigate();
  const { toggle, handleCancel, toggleModal } = useModal();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<ClinicImageData[]>(["clinicImages"], getClinicImages);

  const deleteMutation = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["clinicImages"]);
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingAnimation />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );


  const goToClinicDetails =  (id : number) => {
    navigate(`/manage-listings/${id}`);
  }

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    toggleModal();
  };

  const handleDeleteConfirm = async () => {
    if (selectedId !== null) {
      await deleteMutation.mutateAsync(selectedId);
      setSelectedId(null);
      handleCancel();
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center mb-4 sm:mb-6 text-gray-700 text-base sm:text-lg cursor-pointer hover:text-gray-900 transition duration-200"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-lg sm:text-xl" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Manage Your Listings</h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
        Here are all the clinics you've listed. Keep them updated or remove any that are no longer available.
      </p>

      {data?.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">No listings available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.map((listing) => (
            <div

            onClick={() => goToClinicDetails(listing.id)}
              key={listing.id}
              className="relative bg-white p-3 sm:p-4 cursor-pointer rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="w-full h-48 sm:h-56 rounded-lg overflow-hidden">
                <img
                  src={cleanImageUrl(listing.images[0])}
                  alt="Clinic"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-2 sm:mt-3">
                <p className="text-sm sm:text-lg font-semibold text-gray-900">
                  Listed on {listing.formatted_date}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{listing.location}</p>
              </div>

              <button
                onClick={(e) => { handleDeleteClick(listing.clinic); e.stopPropagation() }}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 sm:p-1.5 px-2 sm:px-3 cursor-pointer bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}

      {toggle && selectedId !== null && (
        <DeleteModal onCancel={handleCancel} onConfirm={handleDeleteConfirm} id={selectedId} />
      )}
    </div>
  );
}
