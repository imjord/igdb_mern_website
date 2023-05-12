import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

// pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
