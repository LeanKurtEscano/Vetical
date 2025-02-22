import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserDetails from "../../hooks/useUserDetails";
import { FormDatas, Specialization } from "../../constants/interfaces/VetInterface";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecializations, submitRegistration } from "../../services/Vet";
import { LoadingAnimation } from "../../components/LoadingAnimation";
import useRole from "../../hooks/useRole";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/MyContext";
const VetRegistration: React.FC = () => {
  const { setDetails } = useMyContext();
  const { userDetails } = useUserDetails();
  const nav = useNavigate();
  const { changeRoleFromRegister } = useRole();
  const [formData, setFormData] = useState<FormDatas>({
    id: undefined,
    phone_number: "",
    first_name: "",
    middle_name: "",
    last_name: "",
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
  const [selectedSpecializations, setSelectedSpecializations] = useState<Specialization[]>([]);


  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (userDetails?.latitude && userDetails?.longitude) {
      setPosition({
        lat: userDetails.latitude,
        lng: userDetails.longitude,
      });
    }
  }, [userDetails]);


  useEffect(() => {
    const userId = Number(sessionStorage.getItem("userId")) || 0;
    const email = sessionStorage.getItem("email") || "";
    const birthdate = sessionStorage.getItem("birthdate") || "";
    const age = sessionStorage.getItem("age") || "";
    const latitudeStr = sessionStorage.getItem("lat");
    const latitude = latitudeStr ? parseFloat(latitudeStr) : 0;
    const longitudeStr = sessionStorage.getItem("long");
    const longitude = longitudeStr ? parseFloat(longitudeStr) : 0;




    setFormData((prev) => ({
      ...prev,
      id: prev.id || userId,
      email: prev.email || email,
      birthday: prev.birthday || birthdate,
      age: prev.age || age,
      latitude: prev.latitude || latitude,
      longitude: prev.longitude || longitude,
    }));
  }, []);

  const { data, isLoading } = useQuery<Specialization[]>(
    ["Specializations"],
    fetchSpecializations,
    { staleTime: 1000 * 60 * 60 * 24 }
  );

  if (isLoading) return <LoadingAnimation />;





  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addSpecialization = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (!value) return;

    const selectedSpec = data?.find((spec) => spec.id === parseInt(value));

    if (!selectedSpec) return;

    if (!selectedSpecializations.some((spec) => spec.id === selectedSpec.id)) {
      setSelectedSpecializations((prev) => ([...prev, selectedSpec]));
    }

  };

  const removeSpecialization = (specialization: number) => {
    setSelectedSpecializations(selectedSpecializations.filter((s) => s.id !== specialization));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalData = { ...formData, specializations: selectedSpecializations };
    console.log(finalData);
    try {
      const response = await submitRegistration(finalData);

      if (response.status === 200) {
        changeRoleFromRegister();
        setDetails((prev: { is_veterinarian: boolean }) => ({ ...prev, is_veterinarian: true }))
        nav('/');
      }
    } catch (error: any) {
      alert("Something Went Wrong");
    }
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-center">
          Join as a Veterinarian
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

          {/* Name Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="text"
              name="middle_name"
              placeholder="Middle Name (Optional)"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails?.email || ""}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={userDetails?.birthdate || ""}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              value={userDetails?.age || ""}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <textarea
              name="clinic_address"
              placeholder="Clinic Address"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300 md:col-span-2"
            ></textarea>
            <input
              type="number"
              name="years_of_experience"
              placeholder="Years of Experience"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
            <input
              type="text"
              name="license_number"
              placeholder="License Number"
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            />
          </div>

          <textarea
            name="education"
            placeholder="Education"
            onChange={handleChange}
            className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
          ></textarea>

          <div>
            <label className="block font-semibold text-orange-700 mb-2">
              Specializations
            </label>
            <select
              onChange={addSpecialization}
              className="w-full p-3 border border-black rounded-lg focus:ring focus:ring-orange-300"
            >
              <option value="">Select Specialization</option>
              {data?.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.specialization}
                </option>
              ))}
            </select>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedSpecializations?.map((spec) => (
                <span
                  key={spec.id}
                  className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-full text-sm shadow-md"
                >
                  {spec.specialization}
                  <button
                    type="button"
                    onClick={() => removeSpecialization(spec.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-white hover:text-red-200"
                    />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="h-56 md:h-64 w-full rounded-lg border border-orange-300 overflow-hidden">
            <MapContainer center={position || { lat: 0, lng: 0 }} zoom={13} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 cursor-pointer text-white font-semibold py-3 rounded-lg hover:bg-orange-700 transition duration-300"
          >
            Register as Veterinarian
          </button>
        </form>
      </div>
    </div>


  );
};

export default VetRegistration;
