var AWS = require("aws-sdk");
const TableName = require("../../config/config").Orders;
const docClient = new AWS.DynamoDB.DocumentClient();
const getOrders = require("../../models/ordersModel");
const uuid = require("uuid");
const { getSubTotal, getGrandTotal } = require("../helper/orders");

const addOrderDal = async (order) => {
  try {
    if (!order.orderedItems || !order.orderedItems[0].price || !order.orderedItems[0].quantity) {
        return null
    }
    const subTotal = getSubTotal(order.orderedItems);
    const tax = subTotal * 0.05;
    const discount = 0;
    const grandTotal = getGrandTotal(subTotal, tax, discount);
    const newOrder = getOrders({
      ...order,
      subTotal,
      tax,
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
          orderStatus: "Booked",
        },
      })
      .promise();
      console.log();
    return {
      ...newOrder,
      subTotal: subTotal,
      grandTotal: grandTotal,
      discount: discount,
      tax: tax,
      orderStatus: "Booked",
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
    return null;
  }
};

const updateOrderStatusDal = async (orderId, statusValue) => {
  try {
    if (orderId === ' ' && statusValue === ' ') {
      return false;
    }

    if (
      statusValue === "Picked" ||
      statusValue === "Shipped" ||
      statusValue === "Delivered"
    ) {
      const order = await getOrderByIdDal(orderId);
      if (!order) {
        return false;
      }
      await docClient
        .update({
          TableName,
          Key: { orderId },
          ReturnValues: "UPDATED_NEW",
          UpdateExpression: "set orderStatus = :orderStatus",
          ExpressionAttributeValues: {
            ":orderStatus": statusValue,
          },
        })
        .promise();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getOrderByIdDal = async (orderId) => {
  try {
    const order = await docClient.get({ TableName, Key: { orderId } }).promise();
    return order.Item && null
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
