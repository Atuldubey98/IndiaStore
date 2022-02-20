import { Link } from "react-router-dom";
import "./Header.css";
import { ShoppingCart, Home, Face, ShoppingBasket } from "@material-ui/icons";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
const Header = () => {
  const count = useSelector((state) => state.cartAccess.cart.length);
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header__links">
        <div className="header__link">
          <Home />
          <Link to={"/"}>Home</Link>
        </div>
        <div className="header__link">
          <Badge badgeContent={count}>
            <ShoppingCart />
          </Badge>
          <Link to={"/"}>Cart</Link>
        </div>
        <div className="header__link">
          <ShoppingBasket />
          <Link to={"/"}>Orders</Link>
        </div>
        <div className="header__link">
          <Face />
          <Link to={"/"}>Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
