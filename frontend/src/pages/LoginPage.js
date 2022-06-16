import { useEffect, useState } from "react";
import usersApi from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.css";
import {
  setUser,
  setUserError,
  setUserLoading,
} from "../redux/actions/usersAction";
import { Button, CircularProgress } from "@mui/material";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SnackBarHandler from "../components/SnackBarHandler";
import useQuery from "../hooks/useQuery";
import { Store } from "@material-ui/icons";
import axiosInstance from "../api/axios";

const Login = () => {
  const { user, error, loading } = useSelector((state) => state.userAccess);
  const query = useQuery();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [messageOpen, setMessageOpen] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onToggleSignup = (isSignup) => {
    navigate(isSignup ? "/login?signup=true" : "/login");
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setUserLoading(true));
      const response = await usersApi.loginApi(email, password);
      if (response) {
        dispatch(setUser({ email, token: response.data.token }));
        navigate("/", { replace: true });
      } else {
        dispatch(setUserError("Login failed !"));
        setOpen(true);
        throw new Error({});
      }
    } catch (err) {
      setOpen(true);
      dispatch(setUserError("Login failed !"));
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessageOpen(false);
    setOpen(false);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onSignup = async () => {
    try {
      dispatch(setUserLoading(true));
      if (email === "" || password === "" || confirmPassword === "") {
        dispatch(setUserError("Fields cannot be left empty"));
        setOpen(true);
        return;
      }
      if (confirmPassword !== password) {
        dispatch(setUserError("Confirm password and Password doesn't match !"));
        setOpen(true);
        return;
      }
      const response = await axiosInstance.post("users/register", {
        email,
        name,
        password,
        confirmPassword,
      });
      if (response.status === 200) {
        setMessage("User registered ! Login to continue");
      }
    } catch (err) {
      dispatch(setUserError("Error registering the user"))
      setOpen(true);
    } finally {
      dispatch(setUserLoading(false));
    }
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const location = useLocation();
  useEffect(() => {
    document.title = "India Store - Authentication";
  }, []);
  return (
    <div className={"login"}>
      {loading ? (
        <CircularProgress />
      ) : user ? (
        <Navigate to={location.pathname && "/"} />
      ) : (
        <form autoComplete={`on`} onSubmit={onLoginSubmit}>
          <div className="header__logo">
            <Store fontSize={"large"} /> <h1>India Store</h1>
          </div>
          <input
            placeholder="Email*"
            type="email"
            name="email"
            value={email}
            onChange={onEmailChange}
          />

          <input
            placeholder="Password*"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />

          {query.get("signup") && (
            <input
              placeholder="Confirm Password*"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
            />
          )}
          {query.get("signup") && (
            <input
              placeholder="Name"
              type="text"
              value={name}
              onChange={onNameChange}
            />
          )}
          {!query.get("signup") && (
            <Button size="large" variant="contained" type="submit">
              {"Login"}
            </Button>
          )}
          {query.get("signup") && (
            <Button size="large" variant="contained" onClick={onSignup}>
              {"Signup"}
            </Button>
          )}
          <Button
            onClick={() => onToggleSignup(!query.get("signup"))}
            size="large"
          >
            {query.get("signup") ? "Login instead !" : "Signup instead !"}
          </Button>
        </form>
      )}
      <SnackBarHandler
        open={open}
        handleClose={handleClose}
        message={error}
        backgroundColor={"red"}
      />
      <SnackBarHandler
        open={messageOpen}
        handleClose={handleClose}
        message={message}
        backgroundColor={"green"}
      />
    </div>
  );
};
export default Login;
