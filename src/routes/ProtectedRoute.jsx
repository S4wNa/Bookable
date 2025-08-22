import { useAuth } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { session } = useAuth();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return session ? <>{children}</> : <Navigate to="/" />;
}

export default ProtectedRoute;
