import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMyContext } from "../../../context/MyContext";
import { ClinicRegistration } from "../../../constants/interfaces/ClinicInterface";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
    const { clinicData, setClinicData } = useMyContext();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClinicData((prev: ClinicRegistration) => ({
            ...prev,
            [name]: value, // ✅ Make sure the input has a corresponding 'name' attribute
        }));
    };

    const goToLanding = () => {
        navigate("/");
    };

    return (
        <div className="space-y-4">
            {/* Back Button */}
            <button
                onClick={goToLanding}
                className="flex items-center space-x-2 text-gray-600 cursor-pointer hover:text-black transition duration-300"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-md pt-0.5" />
                <span>Back to Home</span>
            </button>

            <h2 className="text-2xl font-semibold">Tell us about your veterinary clinic</h2>

            {/* Clinic Name Input */}
            <div>
                <label className="block text-gray-700 font-medium">Clinic Name</label>
                <input
                    type="text"
                    name="clinicName" // ✅ Add this to update state correctly
                    value={clinicData.clinicName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter clinic name"
                />
            </div>

            {/* Business Email Input */}
            <div>
                <label className="block text-gray-700 font-medium">Business Email</label>
                <input
                    type="email"
                    name="email" // ✅ Add this to update state correctly
                    value={clinicData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter business email"
                />
            </div>

            {/* Opening Hours Input */}
            <div>
                <label className="block text-gray-700 font-medium">Opening Hours</label>
                <input
                    type="time"
                    name="openingHours" // ✅ Add this to update state correctly
                    value={clinicData.openingHours}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Closing Hours Input */}
            <div>
                <label className="block text-gray-700 font-medium">Closing Hours</label>
                <input
                    type="time"
                    name="closeHours" // ✅ Match this with the interface key
                    value={clinicData.closeHours}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Next Button */}
            <button
                onClick={nextStep}
                className="w-full px-6 py-3 bg-orange-500 cursor-pointer text-white rounded-lg hover:bg-orange-600 transition duration-300"
                disabled={!clinicData.clinicName || !clinicData.openingHours || !clinicData.closeHours || !clinicData.email}
            >
                Next
            </button>
        </div>
    );
};

export default StepOne;
