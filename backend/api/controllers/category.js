const uuid = require("uuid");
const AWS = require("aws-sdk");
const { isEmpty } = require("validator");
const docClient = new AWS.DynamoDB.DocumentClient();
const TableName = require("../../config/config").Category;
const errorHandler = require("../errorHandler");

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
    // Acha Code
    //Pro Code optimized
    const promiseCategory = await docClient.scan({ TableName }).promise();
    if (promiseCategory.Items.length === 0) {
      errorHandler({ status: false, message: "No category found !" });
    }
    return res
      .status(200)
      .json({ status: false, categories: promiseCategory.Items });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  addCategory,
  getAllCategory,
};
