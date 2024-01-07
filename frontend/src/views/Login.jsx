import { useEffect, useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/store";
import { Box, TextField, Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = userAuthStore((state) => state.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await login(username, password);
    if (error) {
      alert(error);
    } else {
      navigate("/");
      resetForm();
    }
  };
  return (
    <>
      <Box
        sx={{ backgroundColor: "white" }}
        component="form"
        onSubmit={handleLogin}
      >
        <TextField
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          variant="outlined"
          value={username}
          required
        ></TextField>
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          variant="outlined"
          value={password}
          required
        ></TextField>
        <Button type="submit">Login</Button>
      </Box>
    </>
  );
};

export default Login;
