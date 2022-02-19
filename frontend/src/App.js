import "./App.css";
import Login from "./pages/Login";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading, setUser } from "./redux/actions/usersAction";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  const userAccess = useSelector((state) => state.userAccess);
  console.log(userAccess);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserLoading(true));
    if (email && token) {
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
      </Routes>
    </div>
  );
};

export default App;
