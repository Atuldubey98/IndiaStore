const express = require("express");
const {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrderById,
} = require("../controllers/orders");
const passport = require("passport");
require("../../config/passport")(passport);
const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), postOrder);
router.post(
  "/status",
  passport.authenticate("jwt", { session: false }),
  updateOrderStatus
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getOrdersByUserId
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  cancelOrderById
);
module.exports = router;
