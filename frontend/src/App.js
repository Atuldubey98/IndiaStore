import "./App.css";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useDispatch } from "react-redux";
import { setUserLoading, setUser } from "./redux/actions/usersAction";
import PrivateRoute from "./components/PrivateRoute";
import jwt_decode from "jwt-decode";
const App = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserLoading(true));
    if (email && token && jwt_decode(token).exp * 1000 > Date.now()) {
      dispatch(setUser({ email, token }));
    }
    dispatch(setUserLoading(false));
  }, [dispatch, email, token]);
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
