import { useEffect, useState } from "react";
import Header from "../components/Header";
import Order from "../components/Order";
import axiosInstance from "../api/axios";
import "./OrdersPage.css";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: "No orders fetched" });
  const token = useSelector((state) => state.userAccess.user.token);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const responseOrders = await axiosInstance.get("/orders", { headers: {
            Authorization: token,
        }});
        setOrders(responseOrders.data.orders);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);
  return (
    <div className="orders">
      <Header />
      <div className="orders__home">
        {loading ? (
          <CircularProgress />
        ) : orders && orders.length > 0 ? (
          orders.map((order) => <Order key={order.orderId} order={order} />)
        ) : (
          <div className="order_error">
            <h1>{error.message}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Orders;
