import { Link } from "react-router-dom";

const VetLanding = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Host Your Clinic</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Join our platform and connect with pet owners looking for quality veterinary care.
        </p>

     
        <Link to="/register-vet">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
            Become a Veterinary Host
          </button>
        </Link>
      </div>

   
      <div className="mt-10">
        <img
          src="https://source.unsplash.com/600x400/?veterinarian,clinic"
          alt="Veterinary Clinic"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default VetLanding;
