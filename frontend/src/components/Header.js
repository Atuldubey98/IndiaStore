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
import { Badge, IconButton } from "@mui/material";
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
        <Store fontSize={"medium"} /> <h2>India Store</h2>
      </div>
      <div className="header__content">
        {location.pathname === "/" && (
          <IconButton onClick={openSearchModal}>
            <Search style={style} fontSize="medium" />
          </IconButton>
        )}
        <div className="header__links">
          <Link to={"/"}>
            <IconButton>
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
            </IconButton>
          </Link>

          <Link to={"/cart"}>
            <IconButton>
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
            </IconButton>
          </Link>

          <Link to={"/orders"}>
            <IconButton>
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
            </IconButton>
          </Link>
          <div className="header__linksLogout" style={{ cursor: "pointer" }}>
            <IconButton onClick={handleLogout}>
              <ExitToApp style={style} fontSize="medium" />
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
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
