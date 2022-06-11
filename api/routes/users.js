const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth");
const { register, login, deactivateUser, me, logout } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/",
  isAuthenticated,
  deactivateUser
);
router.get("/me", isAuthenticated, me);
router.post("/logout", isAuthenticated, logout);
module.exports = router;
