import React from 'react';
import useUserDetails from '../hooks/useUserDetails';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Profile: React.FC = () => {
    const { userDetails, isLoading, isError, error } = useUserDetails();
    const { email, birthdate, age, longitude, latitude } = userDetails || {};
    const navigate = useNavigate();
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center h-screen">
        Error: {(error instanceof Error ? error.message : 'Something went wrong')}
    </div>;

    const position: LatLngExpression = [
        latitude ?? 0,
        longitude ?? 0
    ];

    return (
        <div className="max-w-6xl mx-auto p-8">

            <button
                onClick={() => navigate('/')}
                className="flex items-center cursor-pointer text-gray-500 mb-6 hover:text-gray-800 text-lg"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl mr-3" />
                Go Back
            </button>

      
            <motion.h1
                className="text-4xl font-bold text-gray-800 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Account Details
            </motion.h1>

          
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl mb-8 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-medium text-gray-800">{email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Birthdate</p>
                        <p className="text-lg font-medium text-gray-800">{birthdate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Age</p>
                        <p className="text-lg font-medium text-gray-800">{age}</p>
                    </div>
                </div>
            </motion.div>

          
            <motion.div
                className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Location</h2>
                <div className="w-full h-96 rounded-lg overflow-hidden">
                    <MapContainer center={position} zoom={13} className="w-full h-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                        />
                        <Marker position={position}>
                            <Popup>
                                <span className="text-sm font-medium">Your current location</span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;