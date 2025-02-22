import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const StepOne = ({ nextStep }: { nextStep: () => void }) => {
    const [multipleClinics, setMultipleClinics] = useState(false);
    const navigate = useNavigate();

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

            <h2 className="text-2xl font-semibold">Do you own multiple clinics?</h2>

            <div className="flex space-x-4">
                {/* No, Just One Button */}
                <button 
                    onClick={() => { setMultipleClinics(false); nextStep(); }} 
                    className={`px-6 py-3 cursor-pointer rounded-lg transition duration-300 ${
                        !multipleClinics 
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-gray-200'
                    }`}
                >
                    No, Just One
                </button>

                {/* Yes, Multiple Button */}
                <button 
                    onClick={() => { setMultipleClinics(true); nextStep(); }} 
                    className={`px-6 py-3 cursor-pointer rounded-lg transition duration-300 ${
                        multipleClinics 
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    Yes, Multiple
                </button>
            </div>
        </div>
    );
};

export default StepOne;
