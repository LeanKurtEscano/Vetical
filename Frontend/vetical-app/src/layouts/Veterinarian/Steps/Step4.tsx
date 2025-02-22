import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClinicRegistration } from "../../../constants/interfaces/ClinicInterface";
import { useMyContext } from "../../../context/MyContext";
import { services } from "../../../constants";

const Step4 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const { clinicData , setClinicData} = useMyContext();



    const toggleService  = ( id: number) => {
        setClinicData((prev:ClinicRegistration) => ({...prev, 
            selectedServices: prev.selectedServices.includes(id) ? prev.selectedServices.filter(serviceId => serviceId !== id) : [...prev.selectedServices, id]}))
    } 
 

    return (
        <div className="space-y-6 p-6 rounded-2xl max-w-lg mx-auto">
           
            <h2 className="text-2xl font-bold text-gray-800 text-center">Select Your Clinic Services</h2>
            
           
            <p className="text-gray-600 text-center text-sm leading-relaxed">
                Choose the services your clinic provides. Click on a service to add it.
            </p>

           
            <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 
                        ${clinicData.selectedServices.includes(service.id) ? "border-orange-500 bg-orange-100" : "border-gray-300"} 
                        transition-all hover:shadow-md`}
                    >
                        <FontAwesomeIcon icon={service.icon} className="text-orange-500 w-6 h-6" />
                        <span className="text-gray-700 font-medium">{service.name}</span>
                    </div>
                ))}
            </div>

           
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md transition-all"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer shadow-md transition-all"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step4;


