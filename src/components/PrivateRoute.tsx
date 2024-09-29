import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "../contexts/LoginContext";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useLogin();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else return children;
};

export default PrivateRoute;
