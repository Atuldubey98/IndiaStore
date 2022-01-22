const AWS = require("aws-sdk");
const uuid = require("uuid");
require("../awsSetup");
const Products = require("../../config").Products;
const docClient = new AWS.DynamoDB.DocumentClient();
const productItem = require("../../models/products");

const getProduct = async (req, res) => {
  try {
    const productId = req.query.productId;
    const params = {
      TableName: Products,
      Key: {
        productId: productId,
      },
    };
    const product = await docClient.get(params).promise();
    if (!product.Item) {
      throw new Error("Product not found !");
    }
    return res.status(200).json({ status: true, product: product });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const params = {
      TableName: Products,
    };
    const products = await docClient.scan(params).promise();
    if (products.Items.length === 0) {
      throw new Error("Product not found !");
    }
    return res.status(200).json({ status: true, products: products });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const addProduct = async (req, res) => {
  const productId = uuid.v4();
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productImageURL = req.body.productImageURL;
  const productPrice = req.body.productPrice;
  try {
    const params = {
      TableName: Products,
      Item: productItem(
        productId,
        productName,
        productDescription,
        productImageURL,
        productPrice
      ),
    };
    await docClient.put(params).promise();
    return res.status(200).json({
      status: true,
      product: params.Item,
      url: `/api/v1/products?productId=${productId}`,
    });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const productId = req.query.productId || 0;
    if (productId === 0) {
      throw new Error("Product not found !");
    }
    const params = {
      TableName: Products,
      Key: {
        productId,
      },
    };
    const product = await docClient.get(params).promise();
    if (typeof product.Item === "undefined") {
      throw new Error("Product not found !");
    }
    await docClient.delete(params).promise();
    return res
      .status(200)
      .json({ status: true, message: "Product deleted succesfully !" });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
};
