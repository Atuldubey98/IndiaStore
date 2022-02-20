import "./Product.css";
import TextTruncate from "react-text-truncate";
const Product = ({ product }) => {
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
          <button className="product__btnPriceButtonsPlus">+</button>
          <h5 className="product__btnPriceButtonsQty">{1}</h5>
          <button className="product__btnPriceButtonsMinus">-</button>
        </div>
      </div>
    </div>
  );
};
export default Product;
