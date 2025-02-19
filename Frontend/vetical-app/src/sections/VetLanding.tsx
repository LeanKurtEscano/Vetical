import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const VetLanding = () => {
  const nav = useNavigate();
  const goToLanding = () => {
    nav('/landing-vet')
  }
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-white text-gray-900 overflow-hidden">
      {/* Gradient circles */}
      <div className="absolute w-96 h-96 bg-orange-500 rounded-full opacity-30 blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl bottom-10 right-10"></div>

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Host Your Clinic
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto mb-8">
          Join our network and connect with pet owners seeking trusted veterinary care. 
          Start hosting your clinic today!
        </p>

     
          <button onClick={goToLanding} className="px-6 py-3 cursor-pointer text-lg font-semibold bg-orange-500 hover:bg-orange-600 transition rounded-full shadow-lg text-white">
            Register as Veterinarian
          </button>
        
      </motion.div>
    </div>
  );
};

export default VetLanding;
