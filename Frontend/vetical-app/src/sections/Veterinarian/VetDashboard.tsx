import React from "react";
import { useNavigate } from "react-router-dom";
const VetDashboard: React.FC = () => {
  const nav =useNavigate();
  const username = "Dr. Alex"; // Mock username
  
  const goToClinicRegistration = () => {
    nav('/register-clinic');
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
        <button onClick = {goToClinicRegistration}className="px-4 py-2 bg-orange-500 cursor-pointer duration-300 text-white font-medium rounded-full shadow-md hover:bg-red-600 transition">
          + Add Clinic
        </button>
      </div>

      {/* Section Title */}
      <div className="mt-4">
        <h2 className="text-xl font-medium">Your Bookings</h2>
      </div>

      {/* Booking Status Tabs */}
      <div className="flex gap-2 mt-3">
        {["Pending Requests", "Accepted", "Arriving Soon", "Completed", "Pending Review"].map(
          (category) => (
            <button
              key={category}
              className="px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100"
            >
              {category} (0)
            </button>
          )
        )}
      </div>

      {/* Empty State */}
      <div className="mt-6 p-6 bg-gray-100 rounded-lg flex flex-col items-center">
        <span className="text-4xl">📋</span>
        <p className="text-gray-600 mt-2">You don’t have any bookings right now.</p>
      </div>
    </div>
  );
};

export default VetDashboard;

