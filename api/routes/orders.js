const express = require("express");
const {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrderById,
  getOrderById,
} = require("../controllers/ordersController");

const router = express.Router();

router.post("/", postOrder);
router.post(
  "/status",

  updateOrderStatus
);
router.get(
  "/",

  getOrdersByUserId
);

router.get(
  "/byOrderId",

  getOrderById
);

router.delete(
  "/",
  cancelOrderById
);
module.exports = router;
