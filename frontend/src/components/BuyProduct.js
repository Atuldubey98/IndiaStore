import "./BuyProduct.css";
import { ShoppingBasket } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const BuyProduct = () => {
  const total = useSelector((state) => {
    let sum = 0;
    state.cartAccess.cart.forEach((product) => {
      sum += product.productPrice * product.quantity;
    });
    return sum;
  });
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate("/cart");
  };
  return (
    <div className="buyproduct">
      <button className="buyproduct_btn" onClick={handleOrder}>
        <ShoppingBasket />
        <span className="buyproduct_btnTxt">Cart</span>
      </button>
      <h4 className="buyproduct_total">{`Total : ${total.toFixed(2)}`}</h4>
    </div>
  );
};
export default BuyProduct;
