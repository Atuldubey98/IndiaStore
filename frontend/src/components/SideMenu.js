import {
  ExitToApp,
  Home,
  CloseSharp,
  ShoppingBasket,
  ShoppingCart,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";
import "./SideMenu.css";
import {Link} from 'react-router-dom'
const SideMenu = () => {
  const { handleOpenSideMenu } = useContext(ApplicationContext);

  return (
    <div className="sidemenu">
      <div className="menu__icons">
        <IconButton onClick={handleOpenSideMenu}>
          <CloseSharp />
        </IconButton>
      </div>
      <div className="menu__container">
        <Link to={"/"}>
          <div className="menu__item">
            <Home />
            <span className="menu__text">Home</span>
          </div>
        </Link>
        <Link to={"/cart"}>
          <div className="menu__item">
            <ShoppingCart />
            <span className="menu__text">Cart</span>
          </div>
        </Link>
        <Link to={"/orders"}>
          <div className="menu__item">
            <ShoppingBasket />
            <span className="menu__text">Orders</span>
          </div>
        </Link>
        <div className="menu__item">
          <Avatar sx={{ width: "25px", height: "25px" }} />
          <span className="menu__text">Profile</span>
        </div>
        <div className="menu__item">
          <ExitToApp />
          <span className="menu__text">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
