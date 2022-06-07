const express = require("express");
const { register, login, deactivateUser } = require("../controllers/usersController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete(
  "/",
  deactivateUser
);

module.exports = router;
