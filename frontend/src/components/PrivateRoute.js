import { useSelector } from "react-redux";
import LoginPage from '../pages/LoginPage'
import {CircularProgress} from '@mui/material'
const PrivateRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.userAccess);
  if (loading) {
    return <CircularProgress/>
  }else{
    return user ? children : <LoginPage/>
  }
};

export default PrivateRoute;
