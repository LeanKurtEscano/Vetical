import { useState,useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { useMyContext } from "../../../context/MyContext";
import { ClinicRegistration } from "../../../constants/interfaces/ClinicInterface";
const Step3 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
    const { clinicData, setClinicData } = useMyContext();



   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const { name , value } = e.target;

         setClinicData((prev: ClinicRegistration) => ({
            ...prev, [name]: value
         }))
    };

    useEffect(() => {
        const address = sessionStorage.getItem("address") || "";
        setClinicData((prev: ClinicRegistration) => ({
            ...prev, streetAddress: address
        }))
    },[])

  

    return (
        <form className="space-y-3 p-3 text-sm">
            <h2 className="text-lg font-semibold">Confirm Your Clinic Address</h2>
            <select name="country" value={clinicData.country} className="w-full p-2 border rounded-md">
                <option>Philippines - PH</option>
            </select>
            <input name="unit" value={clinicData.unit} onChange = {handleChange}placeholder="Unit, Level (if applicable)" className="w-full p-2 border rounded-md" />
            <input name="building"  value={clinicData.building} onChange = {handleChange} placeholder="Building Name (if applicable)" className="w-full p-2 border rounded-md" />
            <input name="streetAddress" value={clinicData.streetAddress} onChange={handleChange} placeholder="Street Address" className="w-full p-2 border rounded-md" />
        

            <input name="barangay"  value={clinicData.barangay} onChange = {handleChange} placeholder="Barangay / District" className="w-full p-2 border rounded-md" />
            <input name="city"  value={clinicData.city} onChange = {handleChange} placeholder="City / Municipality" className="w-full p-2 border rounded-md" />
            <input name="zipCode"  value={clinicData.zipCode} onChange = {handleChange} placeholder="ZIP Code" className="w-full p-2 border rounded-md" />
            <input name="province"  value={clinicData.province} onChange = {handleChange}  placeholder="Province" className="w-full p-2 border rounded-md" />





            <div className="flex justify-between mt-3">
                <button type="button" onClick={prevStep} className="px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-gray-300 bg-gray-200">Back</button>
                <button type="button" onClick={nextStep} className="px-4 py-2 cursor-pointer rounded-md bg-orange-500 transition-all  hover:bg-orange-600 text-white">Next</button>
            </div>
        </form>
    );
};

export default Step3;
