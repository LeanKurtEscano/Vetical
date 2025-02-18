import React from 'react';
import useUserDetails from '../hooks/useUserDetails';  // Adjust the path as needed
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';  // Import the leaflet CSS

const Profile: React.FC = () => {
    const { userDetails, isLoading, isError, error } = useUserDetails();

    // Loading or error handling

    // Extract necessary user data
    const { email, birthdate, age, longitude, latitude } = userDetails || {};
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center h-screen">
        Error: {(error instanceof Error ? error.message : 'Something went wrong')}
    </div>;
    // Convert latitude and longitude to numbers
    const position: LatLngExpression = [
        latitude ?? 0,
        longitude ?? 0
    ];

    return (
        <div className="max-w-6xl mx-auto p-8">
        {/* Profile Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Account Details</h1>
      
        {/* Personal Information Card */}
        <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 border border-gray-100">
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
        </div>
      
        <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
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
        </div>
      </div>
    );
};

export default Profile;