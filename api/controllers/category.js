const uuid = require("uuid");
const AWS = require("aws-sdk");
const { isEmpty } = require("validator");
const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = require("../../config/config").Category;
const errorHandler = require("../errorHandler");
const {
  getAllCategories,
  getCategoryById,
  deleteCategoryByIdDal,
} = require("../dal/category");

const addCategory = async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    const categoryDescription = req.body.categoryDescription;
    const createdAt = Date.now();
    const modifiedAt = Date.now();
    const deletedAt = 0;
    const categoryId = uuid.v4();
    if (
      isEmpty(categoryName) ||
      categoryName.length < 3 ||
      categoryDescription.length < 3 ||
      isEmpty(categoryDescription)
    ) {
      errorHandler({
        status: false,
        message: "Enter correct category payload ",
      });
    }

    await docClient
      .put({
        TableName,
        Item: {
          categoryId,
          categoryName,
          categoryDescription,
          modifiedAt,
          deletedAt,
          createdAt,
        },
      })
      .promise();
    return res.status(201).json({
      status: true,
      message: `Category created with id ${categoryId}`,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteManyCategoriesById = async (req, res) => {
  try {
    let categoriesCount = 0;
    const categories = [];
    const { categoryIds } = req.body;

    for (let i=0; i < categoryIds.length; i++) {
      const isDeleted = await deleteCategoryByIdDal(categoryIds[i]);
      categoriesCount += isDeleted ? 1 : 0;
      if (!isDeleted) {
        categories.push(categoryIds[i]);
      }
    }
    return res.status(200).json({status : true , categoriesLeft : categories, deleted : categoriesCount})
  } catch (error) {
      return res.status(400).json(error);
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (categories === null) {
      errorHandler({ status: false, message: "There was an error" });
    }
    return res.status(200).json({
      status: true,
      noOfCategories: categories.length,
      categories: categories,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
const getCategoryByIdS = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    const category = await getCategoryById(categoryId);
    if (category) {
      return res.status(200).json({ status: true, category: category });
    }
    errorHandler({ status: false, message: "Error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const isDeleted = await deleteCategoryByIdDal(req.query.categoryId);
    if (isDeleted) {
      return res.status(200).json({ status: true });
    }
    errorHandler({ status: false, message: "Error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  addCategory,
  getAllCategory,
  getCategoryByIdS,
  deleteCategoryById,
  deleteManyCategoriesById,
};
