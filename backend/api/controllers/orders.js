const {
  addOrderDal,
  getOrdersByUserIdDal,
  updateOrderStatusDal,
} = require("../dal/orders");
const uuid = require("uuid");
const errorHandler = require("../errorHandler");
const postOrder = async (req, res) => {
  try {
    const orderId = uuid.v4();
    const order = await addOrderDal({
      ...req.body,
      orderId,
      userId: req.user.Item.id,
    });
    if (order) {
      return res.status(200).json({ status: true, order: order });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user.Item.id;
    const orders = await getOrdersByUserIdDal(userId);
    if (orders) {
      return res.status(200).json({ status: false, orders: orders });
    }
    errorHandler({ status: false, message: "Error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const status = req.body.status;
    console.log(status);
    console.log(orderId);
    const updated = await updateOrderStatusDal(orderId, status);
    console.log(updated);
    if (updated) {
      return res
        .status(200)
        .json({ status: true, order: `Updated with status ${status}` });
    }
    errorHandler({ status: false, message: "Error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
};
