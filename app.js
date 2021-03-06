const PORT = require("./config/config").PORT;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({
  credentials: true,
  origin : ["http://localhost:3000","https://indiastore-app.herokuapp.com", "http://192.168.1.16:3000"]
}));
const bodyParser = require("body-parser");
const products = require("./api/routes/products");
const users = require("./api/routes/users");
const category = require("./api/routes/category");
const orders = require("./api/routes/orders");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend', 'build')))
app.get("/api/v1", (req, res) => {
  return res
    .status(200)
    .json({ status: true, message: "Server is fit and fine" });
});
app.use("/api/v1/products", products);
app.use("/api/v1/users", users);
app.use("/api/v1/category", category);
app.use("/api/v1/orders", orders);
app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
