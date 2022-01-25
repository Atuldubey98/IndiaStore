const AWS = require("aws-sdk");
const uuid = require("uuid");
require("../awsSetup");
const Products = require("../../config/config").Products;
const docClient = new AWS.DynamoDB.DocumentClient();
const productItem = require("../../models/products");
const errorHandler = require("../errorHandler");
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

const updateProduct = async (req, res) => {
  try {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productImageURL = req.body.productImageURL;
    const productPrice = req.body.productPrice;
    const productId = req.query.productId;
    const params = {
      TableName: Products,
      Key: {
        productId,
      },
    };
    const product = await docClient.get(params).promise();
    if (typeof product.Item === "undefined") {
      const error = new Error();
      error.status = 404;
      error.message = "Product Does not exist !";
      throw error;
    }
    const updatedProduct = productItem(
      productId,
      productName,
      productDescription,
      productImageURL,
      productPrice
    );
    const update = await docClient
      .update({
        ...params,
        ReturnValues: "UPDATED_NEW",
        UpdateExpression:
          "set productName = :productName, productDescription = :productDescription, productImageURL = :productImageURL, productPrice = :productPrice",
        ExpressionAttributeValues: {
          ":productName": productName,
          ":productDescription": productDescription,
          ":productImageURL": productImageURL,
          ":productPrice": productPrice,
        },
      })
      .promise();
    if (update.$response.data) {
      return res.status(200).json({ status: true, updated: updatedProduct });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const uploadImageById = async (req, res) => {
  try {
    const productId = req.query.productId;
    const location = req.file.location;
    const params = {
      TableName: Products,
      Key: {
        productId,
      },
    };
    const product = await docClient.get(params).promise();
    if (typeof product.Item === "undefined") {
      const error = new Error();
      error.status = 404;
      error.message = "Product Does not exist !";
      throw error;
    }
    if (location) {
      const updateProduct = await docClient
        .update({
          ...params,
          ReturnValues: "UPDATED_NEW",
          UpdateExpression: "set productImageURL = :productImageURL",
          ExpressionAttributeValues: {
            ":productImageURL": location,
          },
        })
        .promise();
      if (updateProduct.$response.data) {
        return res.status(200).json({ status: true, updateProduct });
      }
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const addManyProducts = (req, res) => {
  var counter = 0;

  try {
    const products = req.body.products;
    var actualLength = products.length;
    if (actualLength > 5) {
      errorHandler({
        status: false,
        message: "Number of Products should be less than 5",
      });
    }

    products.forEach(async (p) => {
        const product = productItem(
          uuid.v4(),
          p.productName,
          p.productDescription,
          p.productImageURL,
          p.productPrice
        );
        await docClient
          .put({
            TableName: Products,
            Item: {
              ...product,
            },
          })
          .promise();
        counter++;      
    });
    return res.status(200).json({ status: true, message: "Products Created!" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  getProduct,
  getProducts,
  addProduct,
  deleteById,
  uploadImageById,
  updateProduct,
  addManyProducts,
};
