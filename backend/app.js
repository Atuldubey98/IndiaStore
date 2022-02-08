const PORT = require("./config/config").PORT;
const express = require("express");
const bodyParser = require("body-parser");
const products = require("./api/routes/products");
const users = require("./api/routes/users");
const category = require("./api/routes/category");
const orders = require("./api/routes/orders");
const app = express();

app.use(bodyParser.json());

app.use("/api/v1/products", products);
app.use("/api/v1/users", users);
app.use("/api/v1/category", category);
app.use("/api/v1/orders", orders);
app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
