import "./Product.css";
import TextTruncate from "react-text-truncate";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../redux/actions/cartActions";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cartAccess = useSelector((state) => state.cartAccess);

  console.log(cartAccess);
  const onPlusPress = () => {
    dispatch(addProduct({ productId, quantity: 1 }));
  };
  const onMinusPress = () => {
    dispatch(removeProduct({ productId, quantity: 1 }));
  };
  const {
    productId,
    productName,
    productDescription,
    productImageURL,
    productPrice,
  } = product;
  return (
    <div className="product">
      <TextTruncate
        line={2}
        element={`h4`}
        truncateText={`...`}
        text={productName}
      />
      <img
        className="product__productImageURL"
        alt={productId}
        src={productImageURL !== "" ? productImageURL : `images/product.jpeg`}
      />
      <TextTruncate
        line={2}
        element={`h5`}
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
          <h5 className="product__btnPriceButtonsQty">{0}</h5>
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
