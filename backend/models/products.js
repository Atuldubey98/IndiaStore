const productItem = (productId, productName, productDescription, productImageURL, productPrice)=>{
    if (productName != null && productName != undefined && typeof productPrice === "number") {
        return {
            productId,
            productName,
            productDescription,
            productImageURL,
            productPrice
        }
    }
    throw new Error("Product cannot be created")
}

module.exports = productItem;