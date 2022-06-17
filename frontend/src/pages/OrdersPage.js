import { useEffect, useState } from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import axiosInstance from "../api/axios";
import "./OrdersPage.css";
import { CircularProgress } from "@mui/material";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    document.title = "India Store - Orders";
  }, []);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const responseOrders = await axiosInstance.get("orders");
        setOrders(responseOrders.data.orders);
      } catch (er) {
        setError("No orders found");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="orders">
      <Header />
      <div className={loading ? "orders__load" : "orders__home"}>
        {loading ? (
          <CircularProgress />
        ) : orders && orders.length > 0 ? (
          orders.map((order) => <Order key={order.orderId} order={order} />)
        ) : (
          <div className="order_error">{error}</div>
        )}
      </div>
    </div>
  );
};
export default Orders;
