import "./App.css";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useDispatch } from "react-redux";
import { setUserLoading, setUser } from "./redux/actions/usersAction";
import PrivateRoute from "./components/PrivateRoute";
import jwt_decode from "jwt-decode";
import ProductPage from "./pages/ProductPage";
const App = () => {
  const token =
    localStorage.getItem("token") &&
    jwt_decode(localStorage.getItem("token")).exp * 1000 > Date.now()
      ? localStorage.getItem("token")
      : null;
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserLoading(true));
    if (email && token) {
      dispatch(setUser({ email, token }));
    } else {
      localStorage.clear();
    }
    dispatch(setUserLoading(false));
  }, [dispatch, email, token]);
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
