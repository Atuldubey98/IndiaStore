const getOrder = (order) => {
  if (
    order.orderId === undefined ||
    order.userId === undefined ||
    order.status === undefined ||
    order.subTotal === undefined ||
    order.tax === undefined ||
    order.discount === undefined ||
    order.grandTotal === undefined ||
    order.name === undefined ||
    order.mobile === undefined ||
    order.city === undefined ||
    order.country === undefined
  ) {
      throw new Error("Order schema error");
  }
  return order;
};

module.exports = getOrder;
