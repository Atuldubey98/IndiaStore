const AWS = require("aws-sdk");
const TableName = require("../../config/config").Users;
const docClient = new AWS.DynamoDB.DocumentClient();

const getUserByIdDal = async (email) => {
  try {
    const user = await docClient
      .get({
        TableName,
        Key: {
          email,
        },
      })
      .promise();
    if (user.Item) {
      return user.Item;
    }
    return null;
  } catch (error) {
    return null;
  }
};
const deactivateUserDal = async (email, password, confirmPassword) => {
  if (!email || !password || !confirmPassword || password !== confirmPassword) {
    return false;
  }

  try {
    const user = await getUserByIdDal(email);
    if (!user) {
      return false;
    }
    await docClient
      .delete({
        TableName,
        Key: {
          email,
        },
      })
      .promise();
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  deactivateUserDal,
};
