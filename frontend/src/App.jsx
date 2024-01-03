import { useState } from "react";
import "./App.css";
import LoginPage from "./utils/LoginPage";
import RegisterPage from "./utils/RegisterPage";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./utils/Dashboard";
import Navigation from "./utils/Navigation";

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setLoginStatus] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
