import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import {
  ShoppingCart,
  Home,
  ShoppingBasket,
  Search,
  ExitToApp,
  Store,
} from "@material-ui/icons";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserLoading } from "../redux/actions/usersAction";
import axiosInstance from "../api/axios";
const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.cartAccess.cart.length);
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(setUserLoading(true));
    const {status} = await axiosInstance.post("users/logout",{});
    if (status === 200) {
      dispatch(setUser(null));
      navigate("/login", { replace: true });
    }
  };
  const openSearchModal = ()=>{
    navigate("?searchModal=true")
  }

  return (
    <div className="header">
      <div className="header__logo">
            <Store fontSize={"large"}/> <h1>India Store</h1>
          </div>
      <div className="header__content">
        {location.pathname === "/" && <Search fontSize="large" onClick={openSearchModal}/>}
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

      </div>
    </div>
  );
};

export default Header;
