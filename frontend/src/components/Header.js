import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  ShoppingCart,
  Home,
  ShoppingBasket,
  Search,
  Close,
  ExitToApp,
} from "@material-ui/icons";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUser } from "../redux/actions/usersAction";
const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartAccess.cart.length);
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const handleSearchVisibility = () => {
    setIsSearch((s) => !s);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/login", { replace: true });
  };
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header__content">
        {!isSearch ? (
          <Search fontSize="large" onClick={handleSearchVisibility} />
        ) : (
          <Close fontSize="large" onClick={handleSearchVisibility} />
        )}
        {isSearch ? (
          <input
            placeholder="Search..."
            name="header__search"
            value={search}
            onChange={onSearchChange}
          />
        ) : (
          <div className="header__links">
            <Link to={"/"}>
              <Home fontSize="large" />
              <span className="header__linksText">Home</span>
            </Link>

            <Link to={"/cart"}>
              <Badge badgeContent={count}>
                <ShoppingCart fontSize="large" />
              </Badge>
              <span className="header__linksText">Cart</span>
            </Link>

            <Link to={"/orders"}>
              <ShoppingBasket fontSize="large" />
              <span className="header__linksText">Orders</span>
            </Link>
            <div className="header__linksLogout" style={{ cursor: 'pointer' }}>
              <ExitToApp fontSize="large" onClick={handleLogout} />
              <span style={{ fontWeight: 'bold' }} className="header__linksText">Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
