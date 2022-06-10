const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth");
const {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrderById,
  getOrderById,
} = require("../controllers/ordersController");

const router = express.Router();

router.post("/", isAuthenticated, postOrder);
router.post(
  "/status",

  updateOrderStatus
);
router.get(
  "/",
  isAuthenticated,
  getOrdersByUserId
);

router.get(
  "/byOrderId",
  isAuthenticated,
  getOrderById
);

router.delete(
  "/",
  isAuthenticated,
  cancelOrderById
);
module.exports = router;
