const express = require("express");
const {
  postOrder,
  getOrdersByUserId,
  updateOrderStatus,
  cancelOrderById,
  getOrderById,
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

router.get(
  "/byOrderId",
  passport.authenticate("jwt", { session: false }),
  getOrderById
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  cancelOrderById
);
module.exports = router;
