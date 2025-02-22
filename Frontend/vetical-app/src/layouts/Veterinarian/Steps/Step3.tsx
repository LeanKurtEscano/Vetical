import { useState,useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";



const Step3 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
    const [formData, setFormData] = useState({
        clinicName: "",
        unit: "",
        building: "",
        streetAddress: "",
        barangay: "",
        city: "",
        zipCode: "",
        province: "",
        country: "Philippines - PH",
        phoneNumber: "",
        email: "",
        website: ""
    });
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const address = sessionStorage.getItem("address") || "";
        setFormData((prev) => ({
            ...prev, streetAddress: address
        }))
    },[])

  

    return (
        <form className="space-y-3 p-3 text-sm">
            <h2 className="text-lg font-semibold">Confirm Your Clinic Address</h2>
            <select name="country" value={formData.country} className="w-full p-2 border rounded-md">
                <option>Philippines - PH</option>
            </select>
            <input name="unit" placeholder="Unit, Level (if applicable)" className="w-full p-2 border rounded-md" />
            <input name="building" placeholder="Building Name (if applicable)" className="w-full p-2 border rounded-md" />
            <input name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" className="w-full p-2 border rounded-md" />
        

            <input name="barangay" placeholder="Barangay / District" className="w-full p-2 border rounded-md" />
            <input name="city" placeholder="City / Municipality" className="w-full p-2 border rounded-md" />
            <input name="zipCode" placeholder="ZIP Code" className="w-full p-2 border rounded-md" />
            <input name="province" placeholder="Province" className="w-full p-2 border rounded-md" />





            <div className="flex justify-between mt-3">
                <button type="button" onClick={prevStep} className="px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-gray-300 bg-gray-200">Back</button>
                <button type="button" onClick={nextStep} className="px-4 py-2 cursor-pointer rounded-md bg-orange-500 transition-all  hover:bg-orange-600 text-white">Next</button>
            </div>
        </form>
    );
};

export default Step3;
