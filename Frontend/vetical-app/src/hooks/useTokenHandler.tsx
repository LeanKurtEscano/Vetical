import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../services/token";
import { useMyContext } from "../context/MyContext";
import { fetchUserDetails } from "../services/auth";

const useTokenHandler = () => {
  const { setIsAuthenticated, setDetails, isAuthenticated } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    const checkStoredToken = async () => {
      const storedToken = localStorage.getItem("access_token");

      if (!storedToken) {
        setIsAuthenticated(false);
        navigate("/");
        return;
      }

      try {
        const authStatus = await userAuth();
        setIsAuthenticated(authStatus);
      } catch (error) {
        console.error(`Token validation failed: ${error}`);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    checkStoredToken();
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetchUserDetails();
        if (response) {
          setDetails({
            email: response.email,
            is_veterinarian: response.is_veterinarian,
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (isAuthenticated) {
      getDetails();
    }
  }, [isAuthenticated, setDetails]);
};

export default useTokenHandler;
