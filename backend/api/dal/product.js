var AWS = require("aws-sdk");
const TableName = require("../../config/config").Products;
const docClient = new AWS.DynamoDB.DocumentClient();
const productItem = require('../../models/products');
const { isEmpty } = require("validator");

const getProductByIdDal = async (productId) => {
  try {
    if (productId === null || productId === undefined || isEmpty(productId)) {
      throw new Error();
    }
    const productResponse = await docClient
      .get({
        TableName,
        Key: {
          productId,
        },
      })
      .promise();
    if (productResponse.Item !== undefined) {
      return productResponse.Item;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const getProductsDal = async () => {
  try {
    const productsResponse = await docClient.scan({ TableName }).promise();
    if (productsResponse.Count <= 0) {
        throw new Error("No product Found");
    }
    return productsResponse.Items;
  } catch (error) {
      return null;
  }
};

const addProductDal = async (product) =>{
    try {
        const newProduct = productItem(product);
        await docClient.put({TableName, Item : newProduct}).promise();
        return newProduct;
    } catch (error) {
        return null;
    }
}

module.exports = {
  getProductByIdDal,
  getProductsDal,
  addProductDal
};
