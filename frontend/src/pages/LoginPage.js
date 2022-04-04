import { useState } from "react";
import usersApi from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import {
  setUser,
  setUserError,
  setUserLoading,
} from "../redux/actions/usersAction";
import { Button, CircularProgress } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import SnackBarHandler from "../components/SnackBarHandler";
const Login = () => {
  const { user, loading } = useSelector((state) => state.userAccess);
  const [open, setOpen] = useState(false);
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
        dispatch(setUserError());
        setOpen(true);
        throw new Error({});
      }
    } catch (err) {
      setOpen(true);
      dispatch(setUserError());
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="login">
      {loading ? (
        <CircularProgress />
      ) : user ? (
        <Navigate to={"/"} />
      ) : (
        <form autoComplete={`on`} onSubmit={onLoginSubmit}>
          <h1>India Store</h1>

          <input
            placeholder="Email"
            type="email"
            name="email"
            onChange={onEmailChange}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={onPasswordChange}
          />
          <Button size="large" variant="contained" type="submit">
            Login
          </Button>
        </form>
      )}
      <SnackBarHandler
        open={open}
        handleClose={handleClose}
        message={"Login failed ! "}
      />
    </div>
  );
};
export default Login;
