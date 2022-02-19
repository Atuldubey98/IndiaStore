import { useState } from "react";
import usersApi from "../api/users";
import { useDispatch, useSelector } from "react-redux";

import {
  setUser,
  setUserError,
  setUserLoading,
} from "../redux/actions/usersAction";
const Login = () => {
  const userAccess = useSelector((state) => state.userAccess);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setUserLoading());
      const response = await usersApi.loginApi(email, password);
      if (response) {
        dispatch(setUser({ email, token: response.data.token }));
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
      ) : (
        <form onSubmit={onLoginSubmit}>
          <input type="email" onChange={onEmailChange} />
          <input type="password" onChange={onPasswordChange} />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};
export default Login;
