const express = require("express");
const { addCategory, getAllCategory } = require("../controllers/category");

const router = express.Router();

router.post("/", addCategory);
router.get("/all", getAllCategory);

module.exports = router;
