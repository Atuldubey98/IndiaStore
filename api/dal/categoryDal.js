var AWS = require("aws-sdk");
const TableName = require("../../config/config").Category;
const docClient = new AWS.DynamoDB.DocumentClient();
const { isEmpty } = require("validator");

const getAllCategories = async () => {
  try {
    const categoriesPromise = await docClient.scan({ TableName }).promise();
    if (categoriesPromise.Items.length === 0) {
      throw new Error();
    }
    return categoriesPromise.Items;
  } catch (error) {
    return null;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    if (categoryId == null || categoryId == undefined || isEmpty(categoryId)) {
      errorHandler({ status: false, message: "Enter the correct categoryId" });
    }
    const categoryPromise = await docClient
      .get({ TableName, Key: { categoryId } })
      .promise();
    return categoryPromise.Item;
  } catch (error) {
    return null;
  }
};

const deleteCategoryByIdDal = async (categoryId) => {
  try {
    if (!categoryId) {
      return false;
    }
    const category = await getCategoryById(categoryId);
    if (!category) {
      return false;
    }
    await docClient.delete({ TableName, Key: { categoryId } }).promise();
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = {
  getAllCategories,
  getCategoryById,
  deleteCategoryByIdDal,
};
