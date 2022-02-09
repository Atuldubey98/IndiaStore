const uuid = require("uuid");
const AWS = require("aws-sdk");
const { isEmpty } = require("validator");
const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = require("../../config/config").Category;
const errorHandler = require("../errorHandler");
const { getAllCategories, getCategoryById } = require("../dal/category");

const addCategory = async (req, res) => {
  try {
    const categoryName = req.body.categoryName;
    const categoryDescription = req.body.categoryDescription;
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
        Item: { categoryId, categoryName, categoryDescription },
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

const getAllCategory = async (req, res) => {
  try {
    const categories = await getAllCategories();
    if (categories === null) {
      errorHandler({ status: false, message: "There was an error" });
    }
    return res.status(200).json({ status: true, categories: categories });
  } catch (error) {
    res.status(400).json(error);
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

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryByIdS,
};
