import { useSelector } from "react-redux";
import BuyProduct from "../components/BuyProduct";
import Header from "../components/Header";
import "./Cart.css";

const Cart = () => {

  const total = useSelector((state) => {
    let sum = 0;
    state.cartAccess.cart.forEach((product) => {
      sum += product.productPrice * product.quantity;
    });
    return sum;
  });
  return (
    <div className="cart">
      <Header />
      <div className="cart__total">
        <strong className="cart__totalDis">{`Total : ${total}`}</strong>
      </div>
      <BuyProduct/>
    </div>
  );
};

export default Cart;
