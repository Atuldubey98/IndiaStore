const express = require("express");
const { addCategory, getAllCategory , getCategoryById} = require("../controllers/category");

const router = express.Router();

router.post("/", addCategory);
router.get("/all", getAllCategory);
router.get('/', getCategoryById);
module.exports = router;