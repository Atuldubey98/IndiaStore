import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import {
  ShoppingCart,
  Home,
  ShoppingBasket,
  Search,
  ExitToApp,
  Menu,
} from "@material-ui/icons";
import { Badge, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserLoading } from "../redux/actions/usersAction";
import axiosInstance from "../api/axios";
import { ApplicationContext } from "../contexts/ApplicationContext";
import { useContext } from "react";

const Header = () => {
  const location = useLocation();
  const { handleOpenSideMenu } = useContext(ApplicationContext);

  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartAccess.cart.length);
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(setUserLoading(true));
    const { status } = await axiosInstance.post("users/logout", {});
    if (status === 200) {
      dispatch(setUser(null));
      navigate("/login", { replace: true });
    }
  };
  const openSearchModal = () => {
    navigate("?searchModal=true");
  };
  const style = { color: "white" };
  return (
    <div className="header">
      <div className="header__logo">
        <IconButton onClick={handleOpenSideMenu}>
          <Menu style={style} />
        </IconButton>
        <h2>India Store</h2>
      </div>
      <div className="header__content">
        {location.pathname === "/" && (
          <Search onClick={openSearchModal} style={style} fontSize="medium" />
        )}
        <div className="header__links">
          <Link to={"/"}>
            <Home fontSize="medium" style={style} />
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "medium",
              }}
              className="header__linksText"
            >
              Home
            </span>
          </Link>

          <Link to={"/cart"}>
            <Badge style={style} badgeContent={count}>
              <ShoppingCart style={style} fontSize="medium" />
            </Badge>
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "medium",
              }}
              className="header__linksText"
            >
              Cart
            </span>
          </Link>

          <Link to={"/orders"}>
            <ShoppingBasket style={style} fontSize="medium" />
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "medium",
              }}
              className="header__linksText"
            >
              Orders
            </span>
          </Link>
          <div className="header__linksLogout" style={{ cursor: "pointer" }}>
            <ExitToApp onClick={handleLogout} style={style} fontSize="medium" />
            <span
              style={{
                fontWeight: "bold",
                color: "white",
                fontSize: "medium",
              }}
              className="header__linksText"
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
