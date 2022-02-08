var AWS = require("aws-sdk");
const TableName = require("../../config/config").Orders;
const docClient = new AWS.DynamoDB.DocumentClient();
const getOrders = require("../../models/orders");
const uuid = require("uuid");
const { getSubTotal, getGrandTotal } = require("../helper/orders");

const addOrderDal = async (order) => {
  try {
    const subTotal = getSubTotal(order.orderedItems);
    const tax = subTotal * 0.05;
    const discount = 0;
    const grandTotal = getGrandTotal(subTotal, tax, discount);
    const newOrder = getOrders({
      ...order,
      subTotal,
      tax,
      status: "Booked",
      discount: 0,
      grandTotal,
    });
    const orderedItems = order.orderedItems.map((o) => {
      return { ...o, orderedItemId: uuid.v4() };
    });
    await docClient
      .put({
        TableName,
        Item: {
          ...newOrder,
          subTotal: subTotal,
          grandTotal: grandTotal,
          discount: discount,
          tax: tax,
          orderedItems,
          status: "Booked",
        },
      })
      .promise();
    return {
      ...newOrder,
      subTotal: subTotal,
      grandTotal: grandTotal,
      discount: discount,
      tax: tax,
      status: "Booked",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getOrdersByUserIdDal = async (userId) => {
  try {
    if (!userId) {
      return null;
    }
    const orders = await docClient
      .scan({
        TableName,
        FilterExpression: "#userId = :userId",
        ExpressionAttributeNames: { "#userId": "userId" },
        ExpressionAttributeValues: { ":userId": userId },
      })
      .promise();
    if (orders.Count <= 0) {
      return null;
    }
    return orders.Items;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateOrderStatusDal = async (orderId, statusValue) => {
  try {
    if (!orderId) {
      return false;
    }
    if (
      statusValue === "Picked" ||
      statusValue === "Shipped" ||
      statusValue === "Delivered"
    ) {
      await docClient
        .update({
          TableName,
          Key: { orderId },
          ReturnValues: "UPDATED_NEW",
          UpdateExpression: "set status = :status",
          ExpressionAttributeValues: {
            ":status": statusValue,
          },
        })
        .promise();
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getOrderByIdDal = async (orderId) => {
  try {
    const order = await docClient.get({ TableName, Key: { orderId } }).promise();
    if (order.Item) {
      return order.Item;
    }
    return null;
  } catch (error) {
    return null
  }
};
const cancelOrderByIdDal = async (orderId) => {
  try {
    const order = await getOrderByIdDal(orderId);
    if (order) {
      await docClient.delete({ TableName, Key: { orderId } }).promise();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
module.exports = {
  addOrderDal,
  getOrdersByUserIdDal,
  updateOrderStatusDal,
  cancelOrderByIdDal,
  getOrderByIdDal
};
