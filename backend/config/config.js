require("dotenv").config();
const PORT = process.env.PORT || 3000;
const SECRET_ACCESS_KEY= process.env.SECRET_ACCESS_KEY;
const ACCESS_KEY_ID= process.env.ACCESS_KEY_ID;
const Products= process.env.Products;
const REGION = process.env.REGION
const BUCKET = process.env.BUCKET
const Users = process.env.Users;
const Category = process.env.Category;
const Orders = process.env.Orders;

module.exports = {
    PORT,
    SECRET_ACCESS_KEY,
    ACCESS_KEY_ID,
    Products,
    REGION,
    BUCKET,
    Users,
    Category,
    Orders
}


// 21000 ka course me ye nahi karega wo jo abi kiya h maine
//Environment variables set kiye hai
