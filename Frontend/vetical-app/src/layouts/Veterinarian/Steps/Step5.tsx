import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMyContext } from "../../../context/MyContext";
import { ClinicRegistration } from "../../../constants/interfaces/ClinicInterface";
const Step5 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
    const {clinicData, setClinicData } = useMyContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            setClinicData((prev: ClinicRegistration) => ({...prev, images: [...(prev.images || []),...selectedFiles]}))
        }
    };

    const removeImage = (index: number) => {
        setClinicData((prev: ClinicRegistration) => ({...prev, images: prev.images.filter(( _ , i) => i !== index )}));
    };

   

    return (
        <div className="space-y-5 p-6 rounded-2xl max-w-lg mx-auto">
       
            <h2 className="text-2xl font-bold text-gray-800 text-center">Upload Clinic Images</h2>
            <p className="text-gray-600 text-center">Upload images of your clinic. You can preview them below.</p>

        
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer hover:border-orange-500 transition">
                <FontAwesomeIcon icon={faUpload} className="text-gray-600 text-3xl mb-2" />
                <span className="text-gray-600">Click to upload or drag & drop files</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

        
            <div className="grid grid-cols-2 gap-4">
                {clinicData.images.map((image: File, index: number) => (
                    <div key={index} className="relative rounded-lg overflow-hidden border border-gray-300 shadow-md">
                        <img src={URL.createObjectURL(image)} alt="Clinic Form" className="w-full h-32 object-cover" />
                        <button
                            className="absolute top-2 right-2 bg-orange-500 text-white cursor-pointer duration-200 hover:bg-orange-600 rounded-full p-0.5 px-2"
                            onClick={() => removeImage(index)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                ))}
            </div>

           
            <div className="flex justify-between mt-4">
                <button onClick={prevStep} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer duration-200 text-gray-700 rounded-full shadow-md">
                    Back
                </button>
                <button onClick={nextStep} className="px-5 py-2 bg-orange-500 text-white cursor-pointer duration-200 hover:bg-orange-600 rounded-full shadow-md">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step5;
