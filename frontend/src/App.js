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
import { setUser, setUserError, setUserLoading } from "./redux/actions/usersAction";
import ProfilePage from "./pages/ProfilePage";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
  (
    async ()=>{
      setUserLoading(true);
      const {status, data} = await axiosInstance.get("users/me");
      if (status === 400) {
        dispatch(setUserError("No user found"));
      }else{
        dispatch(setUser(data))
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
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
