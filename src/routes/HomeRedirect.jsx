import { useAuth } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";

function HomeRedirect() {
  const { session } = useAuth();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  if (session) {
    return <Navigate to="/mainlibrary" />;
  }

  return <Home />;
}

export default HomeRedirect;
