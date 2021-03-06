import { useSelector } from "react-redux";
import Header from "../components/Header";
import Product from "../components/Product";
import CartItem from "../components/CartItem";
import useQuery from "../hooks/useQuery";
import "./CartPage.css";
import { ShoppingBasket } from "@material-ui/icons";
import { Button, CircularProgress } from "@mui/material";
import Modal from "react-modal";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import PhoneInput from "react-phone-number-input/input";
import SimilarProducts from "../components/SimilarProducts";
import SideMenu from "../components/SideMenu";
const CartPage = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState();
  const [loading, setLoading] = useState(false);
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
      maxHeight: "90%",
      bottom: "auto",
      marginRight: "-50%",
      overflowY: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  const products = useSelector((state) => {
    const cartProducts = [];
    state.cartAccess.cart.forEach((cartItem) => {
      state.productsAccess.products.forEach((product) => {
        if (product.productId === cartItem.productId) {
          cartProducts.push({ ...product, quantity: cartItem.quantity });
        }
      });
    });
    return cartProducts;
  });
  const onPlaceOrder = async (e) => {
    setLoading(true);
    e.preventDefault();
    closeModal();
    try {
      const orderedItems = products.map((p) => {
        return {
          price: p.productPrice,
          productId: p.productId,
          quantity: p.quantity,
        };
      });
      const order = {
        name,
        city,
        country,
        mobile,
        orderedItems,
      };

      const { data } = await axiosInstance.post("/orders", order);
      setLoading(false);
      if (data.status) {
        navigate("/orders");
      } else {
        console.log("Error");
      }
    } catch (e) {
      console.log(e);
    }
  };
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
  useEffect(() => {
    document.title = "India Store - Cart";
  }, []);

  return (
    <div className="cart">
      <Header />
      {query.has("sidemenu") && <SideMenu />}
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="cart__page">
          <div className="cart__total">
            <strong className="cart__totalDis">{`Total : Rs. ${total.toFixed(
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
                <form onSubmit={onPlaceOrder}>
                  <input
                    type={"text"}
                    onChange={onNameChange}
                    value={name}
                    placeholder="Name*"
                  />
                  <PhoneInput
                    country="IN"
                    onChange={setMobile}
                    placeholder={"Mobile*"}
                    value={mobile}
                  />
                  <input
                    type={"text"}
                    onChange={onCityChange}
                    value={city}
                    placeholder="City*"
                  />
                  <input
                    type={"text"}
                    onChange={onCountryChange}
                    value={country}
                    placeholder="Country*"
                  />
                  <div className="cart__modalButtons">
                    <Button type="submit" color="success" variant={"contained"}>
                      Place Order
                    </Button>
                    <Button
                      onClick={closeModal}
                      color="error"
                      variant={"contained"}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>

          <div
            className={
              products && products.length > 0 ? "cart__cartItems" : "cart__no"
            }
          >
            {products && products.length > 0 ? (
              products.map((product) => (
                <Product key={product.productId} product={product} />
              ))
            ) : (
              <div className="cart__empty">
                <img src="images/empty-cart" alt="empty-cart" />
                <div className="cart__emptyData">
                  <h2>You cart need some items</h2>
                  <p>Fill your cart with the best of India Store</p>
                  <Link to={"/"}><h4>Start Shopping</h4></Link>
                </div>
              </div>
            )}
          </div>
          <SimilarProducts />
        </div>
      )}
    </div>
  );
};

export default CartPage;
