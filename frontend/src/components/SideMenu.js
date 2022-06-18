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
        <div className="menu__item">
          <Home />
          <span className="menu__text">Home</span>
        </div>
        <div className="menu__item">
          <ShoppingCart />
          <span className="menu__text">Cart</span>
        </div>
        <div className="menu__item">
          <ShoppingBasket />
          <span className="menu__text">Orders</span>
        </div>
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
