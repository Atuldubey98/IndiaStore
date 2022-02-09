const passport = require("passport");
require("../../config/passport")(passport);
const bcrypt = require("bcrypt");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const TableName = require("../../config/config").Users;
const SECRET_ACCESS_KEY = require("../../config/config").SECRET_ACCESS_KEY;
const ARN = require("../../config/config").ARN;
const docClient = new AWS.DynamoDB.DocumentClient();
const getUserModel = require("../../models/users");
const errorHandler = require("../errorHandler");
const { deactivateUserDal } = require("../dal/users");
const register = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const avatar = req.body.avatar;
    const name = req.body.name;
    const id = uuid.v4();
    const newUser = getUserModel(id, email, password, avatar, name);
    const params = {
      TableName,
      Key: {
        email,
      },
    };

    const user = await docClient.get(params).promise();
    if (user.Item) {
      errorHandler({ message: "User Already Exist", code: 400 });
    }
    const passwordHash = await bcrypt.hash(newUser.password, 10);
    const createUserParams = {
      TableName,
      Item: {
        email,
        password: passwordHash,
        name,
        avatar,
        id,
      },
    };
    const createdUser = await docClient.put(createUserParams).promise();

    if (createdUser) {
      return res.status(200).json({
        status: true,
        message: "User created",
        user: `${newUser.email} is created`,
      });
    }
    errorHandler({ message: "Some error occured", code: 400 });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const params = {
      TableName,
    };
    const user = await docClient.get({ ...params, Key: { email } }).promise();
    if (typeof user.Item === "undefined" || !user.Item) {
      errorHandler({ status: false, message: "Authentication failed !" });
    }
    const isAuth = await bcrypt.compare(password, user.Item.password);
    if (!isAuth) {
      errorHandler({ status: false, message: "Authentication failed !" });
    }
    const token = jwt.sign(
      {
        id: user.Item.id,
        email: user.Item.email,
        name: user.Item.name,
      },
      SECRET_ACCESS_KEY,
      { expiresIn: 36000 }
    );
    return res.status(200).json({ status: true, token: `Bearer ${token}` });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deactivateUser = async (req, res) => {
  try {
    const email = req.body.email ?? "";
    const password = req.body.password ?? "";
    const confirmPassword = req.body.confirmPassword ?? "";
    if (email === "" || email !== req.user.Item.email) {
      errorHandler({ status: false, message: "Error Occured" });
    }
    const isDeactivated = await deactivateUserDal(
      email,
      password,
      confirmPassword
    );
    if (isDeactivated) {
      req.logout();

      return res
        .status(200)
        .json({ status: true, message: "Account Deactivated" });
    }
    errorHandler({ status: false, message: "Error Occured" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = {
  register,
  login,
  deactivateUser,
};
