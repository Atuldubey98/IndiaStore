import "./Product.css";
import { useNavigate } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../redux/actions/cartActions";
const Product = ({ product }) => {
  const {
    productId,
    productName,
    productDescription,
    productImageURL,
    productPrice,
  } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state) =>
    state.cartAccess.cart.length > 0
      ? state.cartAccess.cart.filter((p) => p.productId === productId)
      : []
  );
  const onPlusPress = () => {
    dispatch(addProduct({ productId, quantity: 1, productPrice }));
  };
  const onMinusPress = () => {
    dispatch(removeProduct({ productId, quantity: 1, productPrice }));
  };
  const onProductPage = () => {
    navigate(`/product/${productId}`);
  };
  return (
    <div
      className={
        cartItem.length > 0 && cartItem[0].quantity > 0
          ? "productSelected product"
          : "product"
      }
    >
      <TextTruncate
        line={2}
        element={`h4`}
        truncateText={`...`}
        text={productName}
      />
      <img
        className="product__productImageURL"
        alt={productId}
        onClick={onProductPage}
        src={productImageURL !== "" ? productImageURL : `images/product.jpeg`}
      />
      <TextTruncate
        line={2}
        element={`p`}
        truncateText={`...`}
        text={productDescription}
      />
      <div className="product__btnPrice">
        <strong className="product__productPrice">{`Rs. ${productPrice}`}</strong>
        <div className="product__btnPriceButtons">
          <button
            onClick={onPlusPress}
            className="product__btnPriceButtonsPlus"
          >
            +
          </button>
          <h5 className="product__btnPriceButtonsQty">
            {cartItem.length > 0 ? cartItem[0].quantity : 0}
          </h5>
          <button
            onClick={onMinusPress}
            className="product__btnPriceButtonsMinus"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
