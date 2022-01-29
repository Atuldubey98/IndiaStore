const getSubTotal = (orderedItems) => {
  let total = 0;
  orderedItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

const getGrandTotal = (subTotal, tax, discount) =>{
    const total = subTotal + tax - discount;
    return total;
}
module.exports = {
  getSubTotal,
  getGrandTotal
};
