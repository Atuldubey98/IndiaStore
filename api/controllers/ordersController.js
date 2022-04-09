const {
  addOrderDal,
  getOrdersByUserIdDal,
  updateOrderStatusDal,
  cancelOrderByIdDal,
  getOrderByIdDal,
} = require("../dal/ordersDal");
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
    errorHandler({ status: false, message: "Error occured" });
  } catch (error) {
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
    const orderId = req.body.orderId && " ";
    const status = req.body.status && " ";

    const updated = await updateOrderStatusDal(orderId, status);
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

const cancelOrderById = async (req, res) => {
  try {
    const orderId = req.query.orderId || " ";
    const isDeleted = await cancelOrderByIdDal(orderId);
    if (isDeleted) {
      return res.status(200).json({ status: true, message: "Order Cancelled" });
    }
    errorHandler({ status: false, message: "Some error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.query.orderId && " ";
    const order = await getOrderByIdDal(orderId);
    if (!order) {
      errorHandler({ status: false, message: "Order not avalaible" });
    }
    return res.status(200).json({ status: true, order });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrderById,
  getOrderById,
};
