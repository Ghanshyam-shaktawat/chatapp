import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import Chat from "./pages/Chat";
import Test from "./views/Private";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route
              path="/test"
              element={
                <PrivateRoute>
                  <Test />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </MainWrapper>
      </BrowserRouter>
    </>
  );
}

export default App;
