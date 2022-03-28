const getOrders = (orders) => {
  if (
    orders.orderId === undefined ||
    orders.userId === undefined ||
    orders.subTotal === undefined ||
    isNaN(orders.subTotal) ||
    orders.tax === undefined ||
    isNaN(orders.tax)||
    orders.discount === undefined ||
    isNaN(orders.discount)||
    orders.grandTotal === undefined ||
    orders.name === undefined ||
    orders.mobile === undefined ||
    orders.city === undefined ||
    orders.country === undefined ||
    orders.orderedItems === undefined ||
    orders.orderedItems.lengh <= 0
  ) {
      throw new Error("Orders schema error");
  }
  return orders;
};

module.exports = getOrders;
