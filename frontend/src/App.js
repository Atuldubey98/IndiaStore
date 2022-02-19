import "./App.css";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserError,
  setUserLoading,
  setUser,
} from "./redux/actions/usersAction";
const App = () => {
  const userAccess = useSelector((state) => state.userAccess);
  const [user, setUser] = useState(localStorage.getItem("user_india_store"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserLoading(true));
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUserLoading(false));
    }
  }, [dispatch, user]);
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
