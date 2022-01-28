var AWS = require("aws-sdk");
const TableName = require("../../config/config").Category;
const docClient = new AWS.DynamoDB.DocumentClient();
const {isEmpty } = require('validator')

const getAllCategories = async () => {
  try {
    const categoriesPromise = await docClient.scan({ TableName }).promise();
    if (categoriesPromise.Items.length === 0) {
      throw new Error();
    }
    return categoriesPromise.Items;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getCategoryById = async (categoryId)=>{
    try {
        console.log(categoryId);
        if (categoryId == null || categoryId == undefined || isEmpty(categoryId)) {
            errorHandler({ status: false, message: "Enter the correct categoryId" });
          }
          const categoryPromise = await docClient
            .get({ TableName, Key: { categoryId } })
            .promise();
            console.log(categoryPromise.Item);
          if (categoryPromise.Item === null || categoryPromise.Item === undefined) {
              throw new Error();
          }
          return categoryPromise.Item;
    } catch (error) {
        return null;
    }
}
module.exports = {
    getAllCategories,
    getCategoryById
}