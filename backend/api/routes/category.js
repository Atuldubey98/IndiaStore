const express = require("express");
const passport = require("passport");
require("../../config/passport")(passport);

const {
  addCategory,
  getAllCategory,
  getCategoryById,
} = require("../controllers/category");

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addCategory);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getAllCategory
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getCategoryById
);
module.exports = router;
