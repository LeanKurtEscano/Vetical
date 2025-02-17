import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faMapMarkerAlt, faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useMyContext } from "../context/MyContext";
import { Register } from "../constants/interfaces/AuthInterface";
import { registerUser } from "../services/auth";


const SignupModal = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { setToggleModals } = useMyContext();
  const [emailError , setEmailError] = useState("");
  const [registerDetails, setRegisterDetails] = useState<Register>({
    email: "",
    password: "",
    birthdate: "",
    age: "",
    confirmPassword: "",
    longitude: "",
    latitude: ""

  })

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdate = e.target.value;
    if (!birthdate) {
      setRegisterDetails((prev) => ({ ...prev, birthdate: "", age: "" }));
      return;
    }

    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    let ageString = age.toString();

    setRegisterDetails((prev) => ({ ...prev, birthdate: birthdate, age: ageString }));
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const closeSignup = () => {
    setToggleModals((prev: { toggleSignup: boolean }) => ({
      ...prev,
      toggleSignup: false,
    }));
  };

  const goBack = () => {
    setToggleModals((prev: { toggleLogin: boolean }) => ({
      ...prev,
      toggleLogin: true,
    }));

    setToggleModals((prev: { toggleSignup: boolean }) => ({
      ...prev,
      toggleSignup: false,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterDetails(prevData => {
      const updatedData = { ...prevData, [name]: value }

      return updatedData;
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const storeDetails = JSON.stringify(registerDetails)
    sessionStorage.setItem("registerDetails", storeDetails);
    sessionStorage.setItem("email", JSON.stringify(registerDetails.email));

    try {

      const response = await registerUser(registerDetails);
      if (response.status === 200) {
        setToggleModals((prev: { toggleRegister: boolean }) => ({
          ...prev,
          toggleRegister: true
        }))

        setToggleModals((prev: { toggleSignup: boolean }) => ({
          ...prev,
          toggleSignup: false,
        }));


      }


    } catch (error:any) {

       const  { data, status} = error.response;

      if(status === 403) {
        setEmailError(data.error);
        return;

      } else {
        alert("Please fill out all the fields");
        return
      }

      

    }


  }

  const getLocation = (): void => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setRegisterDetails((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        () => {
          alert("Location access denied.");
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Geolocation is not supported.");
    }
  };

  return (
    <section className="h-auto min-h-screen w-full pt-16 fixed inset-0 flex justify-center items-center bg-gray-500/50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative mb-28 overflow-auto flex flex-col p-6 z-20 border-orange-500 bg-white border-2 rounded-md shadow-2xl w-[500px] h-[450px]"
      >
        <div className="flex justify-between items-center mb-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-gray-500 text-base cursor-pointer"
            onClick={goBack}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className="text-gray-500 text-base cursor-pointer"
            onClick={closeSignup}
          />
        </div>
        <h2 className="text-xl font-semibold text-center">Create Your Account</h2>

        <form className="flex flex-col mt-4 gap-y-2" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            value={registerDetails.email}
            name="email"
            onChange={handleChange}
            id="email"
            className="mt-1 bg-white border border-gray-300 rounded p-2 w-full placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            placeholder="Enter your email"
            autoComplete="off"
          />

          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <div className="flex gap-x-4">
            <div className="w-1/2">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                Birthdate:
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={registerDetails.birthdate}
                onChange={handleBirthdateChange}
                className="mt-1 bg-white border border-gray-300 rounded p-2 w-full placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={registerDetails.age}
                readOnly
                className="mt-1 bg-gray-100 border border-gray-300 rounded p-2 w-full placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={getLocation}
            className="mt-4 flex cursor-pointer items-center justify-center bg-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-300 transition border border-gray-300 shadow-sm"
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-600" />
            Get My Location
          </button>

          {location && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-4"
            >
              <iframe
                className="w-full h-48 rounded-lg border"
                src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          )}

          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={registerDetails.password}
              onChange={handleChange}
              id="password"
              name="password"
              className="mt-1 bg-white border border-gray-300 rounded p-2 w-full placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              placeholder="Enter your password"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={registerDetails.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 bg-white border border-gray-300 rounded p-2 w-full placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              placeholder="Confirm your password"
              autoComplete="off"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-2 flex cursor-pointer items-center text-gray-500"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button
            type ="submit"
            className="mt-4 bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-600 cursor-pointer transition"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </section>


  );
};

export default SignupModal;
