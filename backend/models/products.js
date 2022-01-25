const { isEmpty } = require("validator");
const productItem = (
  productId,
  productName,
  productDescription,
  productImageURL,
  productPrice
) => {
  if (
    !isEmpty(productName) &&
    productName != null &&
    productName != undefined &&
    typeof productPrice === "number"
  ) {
    return {
      productId,
      productName,
      productDescription,
      productImageURL,
      productPrice,
    };
  }
  throw new Error("Product cannot be created");
};

module.exports = productItem;
