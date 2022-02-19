import { useState } from "react";
import usersApi from "../api/users";
import { useDispatch, useSelector } from "react-redux";

import {
  setUser,
  setUserError,
  setUserLoading,
} from "../redux/actions/usersAction";
import { Navigate, useNavigate } from "react-router-dom";
import Homepage from "./Homepage";
const Login = () => {
  const userAccess = useSelector((state) => state.userAccess);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setUserLoading(true));
      const response = await usersApi.loginApi(email, password);
      if (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        dispatch(setUser({ email, token: response.data.token }));
        navigate("/", { replace: true });
      } else {
        throw new Error({});
      }
    } catch (error) {
      dispatch(setUserError());
    }
  };
  return (
    <div className="login">
      {userAccess.loading ? (
        <h1>Loading</h1>
      ) : userAccess.user ? (
        <Navigate to={'/'}/>
      ) : (
        <form onSubmit={onLoginSubmit}>
          <input type="email" onChange={onEmailChange} />
          <input type="password" onChange={onPasswordChange} />
          <button type="submit">Login</button>
        </form>
      )}
      {userAccess.error && <h3>{`Some error occured !`}</h3>}
    </div>
  );
};
export default Login;
