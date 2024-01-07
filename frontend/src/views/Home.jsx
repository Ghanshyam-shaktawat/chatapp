import { Link } from "react-router-dom";
import { userAuthStore } from "../store/store";

const Home = () => {
  const [isLoggedIn, user] = userAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
  return (
    <div>
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );
};

const LoggedInView = ({ user }) => {
  return (
    <div>
      <h1></h1>
      <Link to="/Private">
        <button>Private</button>
      </Link>
      <Link to="/logout">
        <button>Logout</button>
      </Link>
    </div>
  );
};
export const LoggedOutView = ({ title = "Home" }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Home;
