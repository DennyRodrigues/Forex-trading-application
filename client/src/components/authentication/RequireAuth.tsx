import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RequireAuth = (props: any) => {
  let  token = useContext(AuthContext)?.token || null;

  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login" replace />;
  }
}