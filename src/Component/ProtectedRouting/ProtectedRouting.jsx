import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/TokenContext";
export default function ProtectedRouting({ children }) {
  const { UserData } = useContext(UserContext);
  
  if (UserData) {
    return children;
  }
  return <Navigate to="/" />;
}
