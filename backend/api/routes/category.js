const express = require("express");
const passport = require("passport");
require("../../config/passport")(passport);

const {
  addCategory,
  getAllCategory,
  getCategoryByIdS,
  deleteCategoryById,
} = require("../controllers/category");

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addCategory);
router.get("/all", getAllCategory);
router.get("/", getCategoryByIdS);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteCategoryById
);
module.exports = router;
