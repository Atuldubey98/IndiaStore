const express = require("express");
const { isAuthenticated } = require("../../middlewares/auth");


const {
  addCategory,
  getAllCategory,
  getCategoryByIdS,
  deleteCategoryById,
  deleteManyCategoriesById
} = require("../controllers/categoryController");

const router = express.Router();

//@route POST /api/v1/category
//@desc adding category
//@access private
/*
  body(categoryName,categoryDescription, category, createdAt, modifiedAt, deletedAt)
*/
router.post("/", addCategory);

//@route GET /api/v1/category/all
//@desc get all category
//@access private
router.get("/all", isAuthenticated, getAllCategory);

//@route POST /api/v1/category?categoryId=123
//@desc GET categoryById
//@access private
router.get("/", getCategoryByIdS);

//@route POST /api/v1/category?categoryId=123
//@desc DELETE categoryById
//@access private

router.delete(
  "/",
  deleteCategoryById
);

//@route DELETE /api/v1/category/all
//@desc DELETE categoryByIds
//@access private
/*
  body(categoryIds:[])
*/
router.delete(
  "/all",
  deleteManyCategoriesById
);

//@route PATCH /api/v1/category?categoryId=123
//@desc PATCH categoryById
//@access private

module.exports = router;
