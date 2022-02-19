const Product = ({ product }) => {
  console.log(product);
  return (
    <div className="product">
      <h6>{product.productId}</h6>
      <span>{product.productName}</span>
    </div>
  );
};
export default Product;
