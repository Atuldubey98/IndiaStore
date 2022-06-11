import "./App.css";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PrivateRoute from "./components/PrivateRoute";

import ProductPage from "./pages/ProductPage";
import axiosInstance from "./api/axios";
import { useDispatch } from "react-redux";
import { setUserError } from "./redux/actions/usersAction";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  (
    async ()=>{
      const {status, data} = await axiosInstance.get("users/me");
      if (status === 400) {
        dispatch(setUserError("No user found"));
      }
    }
  )();  
  }, [dispatch]);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categoryId/:categoryId"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
