import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./compo/Auth/Signin";
import Signup from "./compo/Auth/Signup";
import MainLibrary from "./pages/MainLibrary";
import "./index.css";
import Home from "./pages/Home";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleOpen() {
    setIsOpen((set) => !set);
  }
  function handleMobileOpen() {
    setIsMobileOpen((setMobile) => !setMobile);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mainlibrary" element={<MainLibrary />} />
      </Routes>
    </>
  );
}

export default App;
