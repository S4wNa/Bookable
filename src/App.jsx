import { Routes, Route } from "react-router-dom";
import "./index.css";
import MainLibrary from "./pages/MainLibrary";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateBook from "./pages/CreateBook";
import AllBooks from "./pages/AllBooks";
import Update from "./pages/Update";
import Info from "./pages/Info";

import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./compo/GlobalHeader/Layout";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mainlibrary" element={<MainLibrary />} />
            <Route path="/viewall" element={<AllBooks />} />
            <Route path="/createbook" element={<CreateBook />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/book/:id" element={<Info />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
}

export default App;
