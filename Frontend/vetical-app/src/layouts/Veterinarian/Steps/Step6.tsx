import { submitClinicRegistration } from "../../../services/Vet";
import { useMyContext } from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { vetApi } from "../../../services/axiosConfig";
const Step6 = ({ prevStep }: { prevStep: () => void }) => {
   const { clinicData } = useMyContext();
   const nav = useNavigate();

   const submitData = async () => {
    const formData = new FormData();
 
    // Log clinicData to see if it's populated
    console.log("Clinic Data:", clinicData);
 
   
    Object.entries(clinicData).forEach(([key, value]) => {
       if (key !== "images") {
          formData.append(key, value as string);
       }
    });
 
    
    if (clinicData.images && clinicData.images.length > 0) {
       clinicData.images.forEach((file: File) => {
          formData.append("images", file);
       });
    } else {
       console.log("No images found.");
    }

    try {
        
        const response = await vetApi.post("/register/clinic/", formData, {
             headers: {
               "Content-Type": "multipart/form-data", 
             },
           });
       if (response.status === 200) {
          
          nav('/');
       }
    } catch (error) {
       console.error("Error submitting clinic registration:", error);
       alert("Something Went Wrong");
    }
 };
 

   return (
      <div className="space-y-4">
         <h2 className="text-2xl font-semibold">Review & Submit</h2>
         <p>Review all your details before submitting. Once submitted, please wait for our approval.</p>

         <div className="flex justify-between">
            <button
               onClick={prevStep}
               className="px-6 py-3 rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
               Back
            </button>
            <button
               onClick={submitData}
               className="px-6 py-3 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-600 transition duration-300"
            >
               Submit
            </button>
         </div>
      </div>
   );
};

export default Step6;
