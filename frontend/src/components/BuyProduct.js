import "./BuyProduct.css";
import { ShoppingBasket } from "@material-ui/icons";
import { useSelector } from "react-redux";
const BuyProduct = () => {
  const total = useSelector((state) => {
    let sum = 0;
    state.cartAccess.cart.forEach((product) => {
      sum += product.productPrice * product.quantity;
    });
    return sum;
  });
  return (
    <div className="buyproduct">
      <button className="buyproduct_btn">
        <ShoppingBasket />
        <span className="buyproduct_btnTxt">Buy</span>
      </button>
      <h4 className="buyproduct_total">{`Total : ${total}`}</h4>
    </div>
  );
};
export default BuyProduct;