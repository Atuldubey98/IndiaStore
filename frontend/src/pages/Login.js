import { useState } from "react";
import usersApi from "../api/users";
import { useDispatch } from "react-redux";
import { setUserError } from "../redux/actions/usersAction";
const Login = () => {
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
      const data = await usersApi.loginApi(email, password);
      if (data) {
      }
      else{
        throw new Error({})
      }
    } catch (error) {
      dispatch(setUserError());
    }
  };
  return (
    <div className="login">
      <form onSubmit={onLoginSubmit}>
        <input type="email" onChange={onPasswordChange} />
        <input type="password" onChange={onEmailChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
