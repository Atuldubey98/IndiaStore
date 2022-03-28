import "./Order.css";
import { Button } from "@mui/material";
const Order = ({ order }) => {
  console.log(order);
  return (
    <div className="order">
      <div className="order__data">
        <div className="order__info">
          <h3>
            <b>Destination</b>
          </h3>
          <div className="order__dest">
            <h4> City : {order.city}</h4>
            <h4> Country: {order.country}</h4>
          </div>
        </div>
        <div className="order__info">
          <h3>
            <b>Personnel Information</b>
          </h3>
          <div className="order__contact">
            <h4> City : {order.name}</h4>
            <h4> Country: {order.mobile}</h4>
          </div>
        </div>
        <h4 className="order__status order__info">
          <h3>
            <b>
              Order status: <span>{order.orderStatus}</span>
            </b>
          </h3>
          <h3>
            <b>
              Number of items :{" "}
              <Button variant={"contained"}>{order.orderedItems.length}</Button>
            </b>
          </h3>
        </h4>
      </div>
      <div className="order__data">{order.grandTotal}</div>
    </div>
  );
};
export default Order;
