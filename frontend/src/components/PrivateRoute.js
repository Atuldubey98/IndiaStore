import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user} = useSelector((state) => state.userAccess);
  return user ? children : <Navigate to={"/login"}/>
};

export default PrivateRoute;
