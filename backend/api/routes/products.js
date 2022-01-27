const express = require("express");
const { upload } = require("../awsSetup");
const passport = require("passport");
require("../../config/passport")(passport);
const {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
  updateProduct,
  uploadImageById,
  addManyProducts,
} = require("../controllers/products");

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getProduct);
router.post("/", passport.authenticate("jwt", { session: false }), addProduct);
router.post(
  "/all",
  passport.authenticate("jwt", { session: false }),
  addManyProducts
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteById
);
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  updateProduct
);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  getProducts
);
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  uploadImageById
);
module.exports = router;
