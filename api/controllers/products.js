const AWS = require("aws-sdk");
const uuid = require("uuid");
require("../awsSetup");
const Products = require("../../config/config").Products;
const {
  getProductsDal,
  getProductByIdDal,
  addProductDal,
} = require("../dal/product");
const docClient = new AWS.DynamoDB.DocumentClient();
const productItem = require("../../models/products");
const errorHandler = require("../errorHandler");
const { getCategoryById } = require("../dal/category");
const getProduct = async (req, res) => {
  try {
    const productId = req.query.productId;

    const product = await getProductByIdDal(productId);
    if (product) {
      return res.status(200).json({ status: true, product: product });
    }
    errorHandler({ status: false, message: "Product Not found" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await getProductsDal();
    return res.status(200).json({ status: true, products: products });
  } catch (error) {
    return res.status(400).json({ status: false, error: error.message });
  }
};

const addProduct = async (req, res) => {
  const productId = uuid.v4();
  try {
    const product = await addProductDal({ ...req.body, productId });
    if (product) {
      return res.status(200).json({
        status: true,
        product: product,
        url: `/api/v1/products?productId=${productId}`,
      });
    }
    errorHandler({
      status: false,
      message: "Error Occured",
    });
  } catch (error) {
    return res.status(400).json(error);
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
    if (!req.query.productId || !req.file) {
      errorHandler({ status: false, message: "Error Occured" });
    }
    const productId = req.query.productId;
    const location = req.file.location;
    const params = {
      TableName: Products,
      Key: {
        productId,
      },
    };
    const product = await getProductByIdDal(productId);
    if (!product) {
      errorHandler({
        status: false,
        message: "Product has been removed or some error has occured",
      });
    }

    await docClient
      .update({
        ...params,
        ReturnValues: "UPDATED_NEW",
        UpdateExpression: "set productImageURL = :productImageURL",
        ExpressionAttributeValues: {
          ":productImageURL": location,
        },
      })
      .promise();

    return res.status(200).json({ status: true, updateProduct });
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

const updateProductCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId;
    const productId = req.body.productId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      errorHandler({ status: false, message: "Error occured" });
    }
    await docClient
      .update({
        TableName: Products,
        Key: { productId },
        ReturnValues: "UPDATED_NEW",
        UpdateExpression: "set categoryId = :categoryId",
        ExpressionAttributeValues: {
          ":categoryId": categoryId,
        },
      })
      .promise();
    return res
      .status(200)
      .json({ status: true, message: `Category Updated for product` });
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
  updateProductCategory,
};
