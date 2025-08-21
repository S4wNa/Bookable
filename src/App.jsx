import { Routes, Route } from "react-router-dom";
import MainLibrary from "./pages/MainLibrary";
import "./index.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AuthContextProvider from "./context/AuthContextProvider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainlibrary" element={<MainLibrary />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
