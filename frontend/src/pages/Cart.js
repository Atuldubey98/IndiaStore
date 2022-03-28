import { useSelector } from "react-redux";
import Header from "../components/Header";
import Product from "../components/Product";
import CartItem from "../components/CartItem";
import useQuery from "../hooks/useQuery";
import "./Cart.css";
import { ShoppingBasket } from "@material-ui/icons";
import { Button } from "@mui/material";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");

  Modal.setAppElement("#root");
  const query = useQuery();
  const navigate = useNavigate();
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
      width: "80%",
      bottom: "auto",
      marginRight: "-50%",
      overflowY: "scroll",
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
  const onPlaceOrder = ()=>{
    
  }
  const closeModal = () => {
    navigate("/cart");
  };
  const openModal = () => {
    navigate("/cart?modal=true");
  };
  const onCityChange = (e) => {
    setCity(e.target.value);
  };
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onCountryChange = (e) => {
    setCountry(e.target.value);
  };
  const onMobileChange = (e) => {
    setMobile(e.target.value);
  };
  return (
    <div className="cart">
      <Header />
      <div className="cart__total">
        <strong className="cart__totalDis">{`Total : ${total.toFixed(
          2
        )}`}</strong>
        <h1>{"Cart"}</h1>
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
        isOpen={query.get("modal") ? true : false}
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
          <div className="cart__profile">
            <h2>Delivery Address</h2>
            <form>
              <input type={"text"} onChange={onNameChange} value={name} placeholder="Name*" />
              <input
                type="tel"
                onChange={onMobileChange}
                value={mobile}
                placeholder="Mobile*"
              />
              <input type={"text"} onChange={onCityChange} value={city} placeholder="City*" />
              <input
                type={"text"}
                onChange={onCountryChange}
                value={country}
                placeholder="Country*"
              />
            </form>
          </div>
          <div className="cart__modalButtons">
            <Button onClick={onPlaceOrder} color="success" variant={"contained"}>
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
