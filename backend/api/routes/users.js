const express = require("express");
const { register, login, deactivateUser } = require("../controllers/users.");
const passport = require("passport");
require("../../config/passport")(passport);
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deactivateUser
);

module.exports = router;
