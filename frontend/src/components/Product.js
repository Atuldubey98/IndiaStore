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

      <strong className="product__productPrice">{productPrice}</strong>
    </div>
  );
};
export default Product;
