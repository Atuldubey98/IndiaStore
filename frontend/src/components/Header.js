import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header_links">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Cart</Link>
        <Link to={"/"}>Orders</Link>
        <Link to={"/"}>Profile</Link>
      </div>
    </div>
  );
};

export default Header;
