import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default App;
