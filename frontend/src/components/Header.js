import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
const Header = () => {
  const email = useSelector((state) => state.userAccess.user.email);
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header_links">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Cart</Link>
        <Link to={"/"}>Orders</Link>
        <Link to={"/"}>Profile</Link>
        <span>{email}</span>
      </div>
    </div>
  );
};

export default Header;
