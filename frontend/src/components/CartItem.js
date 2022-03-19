import "./CartItem.css";
import { useSelector } from "react-redux";
const CartItem = ({ product }) => {
  const { productId } = product;
  const cartItem = useSelector((state) =>
    state.cartAccess.cart.length > 0
      ? state.cartAccess.cart.filter((p) => p.productId === productId)
      : []
  );
  return (
    <div className="cartitem">
      <div className="cartitem__des">
        <h5>{product.productName}</h5>
      </div>
      <div className="cartitem__priceQuan">
        <strong>{`${cartItem[0].quantity}  X ${product.productPrice.toFixed(2)}`}</strong>
      </div>
    </div>
  );
};
export default CartItem;
