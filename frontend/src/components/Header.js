import { Link } from "react-router-dom";
import "./Header.css";
import {
  ShoppingCart,
  Home,
  Face,
  ShoppingBasket,
  Search,
  Close,
  ExitToApp,
} from "@material-ui/icons";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
const Header = () => {
  const count = useSelector((state) => state.cartAccess.cart.length);
  const [search, setSearch] = useState("");
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const [open, setOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const handleSearchVisibility = () => {
    setIsSearch((s) => !s);
  };
  const handleDropVisiblity = () => {
    setOpen((o) => !o);
  };
  const handleLogout = () => {};
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header__content">
        {!isSearch ? (
          <Search onClick={handleSearchVisibility} />
        ) : (
          <Close onClick={handleSearchVisibility} />
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
              <Home />
              <span className="header__linksText">Home</span>
            </Link>

            <Link to={"/cart"}>
              <Badge badgeContent={count}>
                <ShoppingCart />
              </Badge>
              <span className="header__linksText">Cart</span>
            </Link>

            <Link to={"/"}>
              <ShoppingBasket />
              <span className="header__linksText">Orders</span>
            </Link>

            <div className="header__linkProfile" onClick={handleDropVisiblity}>
              <div className="header__linkDropdown">
                <Face />
                <Link to={"/"}>
                  <span className="header__linksText">Profile</span>
                </Link>
              </div>
              <div className="header__linkDropdownItems">
                {open && (
                  <div
                    className="header__linkDropdownContent"
                    onClick={handleLogout}
                  >
                    <ExitToApp />
                    <span className="header__linkDropdownProfile">Profile</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
