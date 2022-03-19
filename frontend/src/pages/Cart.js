import { useSelector } from "react-redux";
import Header from "../components/Header";
import Product from "../components/Product";
import CartItem from "../components/CartItem";
import "./Cart.css";
import { ShoppingBasket } from "@material-ui/icons";
import { Button } from "@mui/material";
import Modal from "react-modal";
import { useState } from "react";
const Cart = () => {
  Modal.setAppElement("#root");

  const total = useSelector((state) => {
    let sum = 0;
    state.cartAccess.cart.forEach((product) => {
      sum += product.productPrice * product.quantity;
    });
    return sum;
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      height: "50%",
      width: "60%",
      bottom: "auto",
      marginRight: "-50%",
      overflowY:"scroll",
      transform: "translate(-50%, -50%)",
    },
  };
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
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="cart">
      <Header />
      <div className="cart__total">
        <strong className="cart__totalDis">{`Total : ${total.toFixed(
          2
        )}`}</strong>
        <Button
          disabled={products.length === 0}
          startIcon={<ShoppingBasket />}
          variant="contained"
          onClick={openModal}
        >
          Order
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm Purchase"
      >
        <div className="cart__modal">
          <div className="cart__modalItems">
            {products.map((product) => (
              <CartItem key={product.productId} product={product} />
            ))}
          </div>
          <div className="cart__modalButtons">
            <Button color="success" variant={"contained"}>
              Place Order
            </Button>
            <Button onClick={closeModal} color="error" variant={"contained"}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <div className="cart__cartItems">
        {products.map((product) => (
          <Product key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
