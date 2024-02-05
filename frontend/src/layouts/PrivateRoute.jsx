import { Navigate } from "react-router-dom";
import { userAuthStore } from "../store/store";

const PrivateRoute = ({ children }) => {
  const loggedIn = userAuthStore((state) => state.isLoggedIn)();
  return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
