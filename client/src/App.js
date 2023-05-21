import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

// pages
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Browse from "./pages/Browse/Browse";
import GenrePage from "./pages/GenrePage/GenrePage";
import Game from "./pages/Game/Game";
import NotFound from "./pages/NotFound/NotFound";
import Library from "./pages/Library/Library";
import Search from "./pages/Search/Search";

// components
import NavBar from "./Components/Navbar/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toggleLoggedIn, navBar, setNavBar } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = localStorage.getItem("userLoggedIn");
    setIsLoggedIn(!!loggedIn);

    if (loggedIn) {
      setNavBar(true);
    }
  }, [location.pathname]);
  const shouldShowNavBar =
    location.pathname !== "/" &&
    location.pathname !== "/register" &&
    isLoggedIn;

  return (
    <>
      {shouldShowNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/games/:id" element={<Game />} />
        <Route path="/browse/:id" element={<GenrePage />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path="/library" element={<Library />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
