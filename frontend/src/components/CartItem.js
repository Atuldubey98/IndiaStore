import "./CartItem.css";
import { Close } from "@material-ui/icons";
const CartItem = ({ product }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__des">
        <h5>{product.productName}</h5>
      </div>
      <div className="cartitem__priceQuan">
        <strong>{product.productPrice.toFixed(2)}</strong>
        <Close/>
      </div>
    </div>
  );
};
export default CartItem;
