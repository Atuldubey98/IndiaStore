const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const REGION = process.env.REGION;
var AWS = require("aws-sdk");

AWS.config.update({
  region: REGION,
  secretAccessKey: SECRET_ACCESS_KEY,
  accessKeyId: ACCESS_KEY_ID,
});

var dynamodb = new AWS.DynamoDB();

var params = {
  TableName: "Orders",
  KeySchema: [
    { AttributeName: "orderId", KeyType: "HASH" }, //Partition key
    //Sort key
  ],
  AttributeDefinitions: [{ AttributeName: "orderId", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
