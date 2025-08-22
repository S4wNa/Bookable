import { Routes, Route } from "react-router-dom";
import "./index.css";
import MainLibrary from "./pages/MainLibrary";
import MyLibrary from "./pages/MyLibrary";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import AllBooks from "./pages/AllBooks";
import Update from "./pages/Update";
import Info from "./pages/Info";

import AuthContextProvider from "./context/AuthContextProvider";
import Layout from "./compo/GlobalHeader/Layout";
import HomeRedirect from "./routes/HomeRedirect";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/mainlibrary"
            element={
              <ProtectedRoute>
                <Layout>
                  <MainLibrary />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mylibrary"
            element={
              <ProtectedRoute>
                <Layout>
                  <MyLibrary />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewall"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllBooks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/addbook"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddBook />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Update />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <Info />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
