import './Product.css'
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
      <span className="product__productName">{productName}</span>
      <img
        className="product__productImageURL"
        alt={productId}
        src={productImageURL !== "" ? productImageURL : `images/product.jpeg`}
      />
      <h5 className="product__productDescription">{productDescription}</h5>
      
      <strong className="product__productPrice">{productPrice}</strong>
    </div>
  );
};
export default Product;
