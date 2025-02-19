import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserDetails from "../hooks/useUserDetails";

const specializationsList = [
  "General Practice",
  "Surgery",
  "Dermatology",
  "Cardiology",
  "Dentistry",
  "Emergency Care",
  "Neurology",
  "Ophthalmology",
];

interface FormData {
  id?: number;
  phone_number: string;
  email: string;
  clinic_address: string;
  years_of_experience: string;
  education: string;
  license_number: string;
  latitude: number;
  longitude: number;
  birthday: string;
  age: string;
  specializations: string[];
}

const getRandomLocation = () => {
  return {
    lat: 14.5995 + (Math.random() * 0.02 - 0.01),
    lng: 120.9842 + (Math.random() * 0.02 - 0.01),
  };
};

const VetRegistration: React.FC = () => {
  const { userDetails } = useUserDetails();
  const [formData, setFormData] = useState<FormData>({
    id: undefined,
    phone_number: "",
    email: "",
    clinic_address: "",
    years_of_experience: "",
    education: "",
    license_number: "",
    latitude: 0,
    longitude: 0,
    birthday: "",
    age: "",
    specializations: [],
  });

 

  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [position, setPosition] = useState(getRandomLocation());

  useEffect(() => {
    setFormData((prev) => ({ ...prev, latitude: position.lat, longitude: position.lng }));
  }, [position]);

  useEffect(() => {
    const userId = Number(localStorage.getItem("userId")) || 0; // Default to 0 if null

    setFormData((prev) => ({
        ...prev,
        id: prev.id || userId, 
    }));
}, []);


 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSpecialization = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value && !selectedSpecializations.includes(value)) {
      setSelectedSpecializations([...selectedSpecializations, value]);
    }
  };

  const removeSpecialization = (specialization: string) => {
    setSelectedSpecializations(selectedSpecializations.filter((s) => s !== specialization));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, specializations: selectedSpecializations };
    console.log("Form Data:", finalData);
  };

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return position === null ? null : <Marker position={position} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", iconSize: [25, 41] })} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-8">
        <h2 className="text-3xl font-semibold 0 mb-6 text-center">Join as a Veterinarian</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
            <input type="email" name="email" placeholder="Email" value={userDetails?.email || ""} onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
            <input type="date" name="birthday" placeholder="Birthday" value={userDetails?.birthdate || ""} onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} value={userDetails?.age || ""} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
            <textarea name="clinic_address" placeholder="Clinic Address" onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300 col-span-2"></textarea>
            <input type="number" name="years_of_experience" placeholder="Years of Experience" onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
            <input type="text" name="license_number" placeholder="License Number" onChange={handleChange} className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300" />
          </div>

          <textarea name="education" placeholder="Education" onChange={handleChange} className="w-full p-3 border  rounded-lg focus:ring focus:ring-orange-300"></textarea>

          <div>
            <label className="block font-semibold text-orange-700 mb-2">Specializations</label>
            <select onChange={addSpecialization} className="w-full p-3 border  rounded-lg focus:ring focus:ring-orange-300">
              <option value="">Select Specialization</option>
              {specializationsList.map((specialization) => (
                <option key={specialization} value={specialization}>{specialization}</option>
              ))}
            </select>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSpecializations.map((specialization) => (
                <span key={specialization} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-sm shadow-md">
                  {specialization}
                  <button type="button" onClick={() => removeSpecialization(specialization)}>
                    <FontAwesomeIcon icon={faTimes} className="text-white hover:text-red-200" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <MapContainer center={position} zoom={13} className="h-64 w-full rounded-lg border border-orange-300">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
          </MapContainer>

          <button type="submit" className="w-full bg-orange-600 text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-300">
            Register as Veterinarian
          </button>
        </form>
      </div>
    </div>
  );
};

export default VetRegistration;
