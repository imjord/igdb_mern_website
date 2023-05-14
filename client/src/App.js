import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

// pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import GenrePage from "./pages/GenrePage/GenrePage";
import NotFound from "./pages/NotFound/NotFound";

// components
import NavBar from "./Components/Navbar/NavBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // check if user is logged in
    const loggedIn = localStorage.getItem("imjordLoggedIn");
    if (loggedIn) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <>
      {loggedIn ? <NavBar /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/:id" element={<GenrePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
