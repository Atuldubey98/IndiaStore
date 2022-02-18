import { useState } from "react";
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onLoginSubmit = async (e) => {
    e.preventDefault();
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
