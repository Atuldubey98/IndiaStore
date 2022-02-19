import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userAccess = useSelector((state) => state.userAccess);
  return userAccess.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
