import { useCallback } from "react";
import { useMyContext } from "../context/MyContext";
const useRole = () => {

    
  const { role, setRole } = useMyContext();

  const changeRole = useCallback(() => {
    const newRole = role === "User" ? "Vet" : "User";
    setRole(newRole);
    localStorage.setItem("role", newRole);
  }, [role, setRole]); 

  return { role, changeRole };
};

export default useRole;
