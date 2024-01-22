import { useEffect, useState } from "react";
import { register } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { userAuthStore } from "../store/store";
import { Box, TextField, Button } from "@mui/material";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const isLoggedIn = userAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPassword2("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      const { error } = await register(
        username,
        firstName,
        lastName,
        email,
        password,
        password2,
      );
      if (error) {
        alert(JSON.stringify(error));
      } else {
        navigate("/Login");
        resetForm();
      }
    }
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          value={firstName}
          variant="outlined"
          placeholder="Firstname"
          color="#fff000"
          onChange={(e) => setFirstName(e.target.value)}
        ></TextField>
        <TextField
          required
          type="text"
          value={lastName}
          variant="outlined"
          placeholder="Lastname"
          onChange={(e) => setLastName(e.target.value)}
        ></TextField>
        <TextField
          required
          type="text"
          value={username}
          variant="outlined"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>
        <TextField
          required
          type="email"
          value={email}
          variant="outlined"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <TextField
          required
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <TextField
          required
          type="password"
          value={password2}
          placeholder="confirm password"
          onChange={(e) => setPassword2(e.target.value)}
        ></TextField>
        <p>{password !== password2 ? "password does not match" : ""}</p>
        <Button type="submit">Register</Button>
      </Box>
    </>
  );
}
export default Register;
