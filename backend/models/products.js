const { isEmpty } = require("validator");
const productItem = (product) => {

  if (
    product.productId === undefined ||
    product.productName === undefined ||
    product.productDescription === undefined ||
    product.productPrice === undefined ||
    isEmpty(product.productId) ||
    isEmpty(product.productName) ||
    isEmpty(product.productDescription) ||
    product.productPrice <= 0
  ) {
    throw new Error("Product cannot be created");
  }
  return product;
};

module.exports = productItem;
