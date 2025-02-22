import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const clinicIcon = L.divIcon({
    className: "custom-clinic-icon",
    html: `
        <div style="
            width: 32px;
            height: 32px;
            background: #FF7F50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="3" width="6" height="18" rx="2" fill="white"/>
                <rect x="3" y="9" width="18" height="6" rx="2" fill="white"/>
            </svg>
        </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const Step2 = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [showMap, setShowMap] = useState(false);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const data = await response.json();

                        if (data.display_name) {
                           sessionStorage.setItem("address",data.display_name);
                           setShowMap(true);
                        } else {
                            console.error("No address found");
                        }
                    } catch (error) {
                        console.error("Error fetching address:", error);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };
    return (
        <div className="space-y-5 p-6  rounded-2xl max-w-lg mx-auto">
           
            <h2 className="text-2xl font-bold text-gray-800 text-center">Get Your Clinic Location</h2>
            <p className="text-gray-600 text-center text-sm">
        Allow location access to set your clinic's exact address on the map.
    </p>

          
            <button
                type="button"
                onClick={getLocation}
                className="flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 cursor-pointer text-white font-medium rounded-full w-full shadow-md hover:bg-orange-600 transition-all"
            >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white w-5 h-5" />
                Get Clinic Location
            </button>

          
            {showMap && location && (
                <div className="rounded-2xl overflow-hidden border border-gray-300 shadow-md animate-fade-in">
                    <MapContainer center={[location.lat, location.lng]} zoom={15} className="h-64 w-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[location.lat, location.lng]} icon={clinicIcon} />
                    </MapContainer>
                </div>
            )}

           
            <div className="flex justify-between mt-4">
                <button type="button" onClick={prevStep} className="px-4 py-2 cursor-pointer rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md transition-all">
                    Back
                </button>
                <button type="button" onClick={nextStep} className="px-5 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 cursor-pointer shadow-md transition-all">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step2;
