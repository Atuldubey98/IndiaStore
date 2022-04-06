import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  ShoppingCart,
  Home,
  ShoppingBasket,
  Search,
  ExitToApp,
} from "@material-ui/icons";
import useQuery from "../hooks/useQuery";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions/usersAction";
const Header = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const count = useSelector((state) => state.cartAccess.cart.length);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    navigate("/", { replace: true });
  };
  const openSearchModal = ()=>{
    navigate("?searchModal=true")
  }
  return (
    <div className="header">
      <h2>India Store</h2>
      <div className="header__content">
        <Search fontSize="large" onClick={openSearchModal}/>
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
