import { useSelector } from "react-redux";
import BuyProduct from "../components/BuyProduct";
import Header from "../components/Header";
import Product from "../components/Product";
import "./Cart.css";

const Cart = () => {
  const total = useSelector((state) => {
    let sum = 0;
    state.cartAccess.cart.forEach((product) => {
      sum += product.productPrice * product.quantity;
    });
    return sum;
  });
  const products = useSelector((state) => {
    const cartProducts = [];
    state.cartAccess.cart.forEach((cartItem) => {
      state.productsAccess.products.forEach((product) => {
        if (product.productId === cartItem.productId) {
          cartProducts.push(product);
        }
      });
    });
    return cartProducts;
  });

  return (
    <div className="cart">
      <Header />
      <div className="cart__total">
        <strong className="cart__totalDis">{`Total : ${total}`}</strong>
        <div className="cart__cartItems">
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
      <BuyProduct />
    </div>
  );
};

export default Cart;
