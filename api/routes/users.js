const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth");
const { register, login, deactivateUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/",
  isAuthenticated,
  deactivateUser
);

module.exports = router;
