var AWS = require("aws-sdk");
const TableName = require("../../config/config").Orders;
const docClient = new AWS.DynamoDB.DocumentClient();
const { isEmpty } = require("validator");
const getOrder = require('../../models/orders');
const addOrder = async (order) =>{
    try {
        const newOrder = getOrder(order);

    } catch (error) {
        return null;
    }
}

module.exports = {
    addOrder
}