import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (password1 !== password2) {
      alert("password doesnt match");
      return; // do something to show user the error;
    }
    const user = {
      username,
      email,
      password1,
      password2,
    };
    const { data } = await axios.post("url", user, {
      headers: { "Content-Type": "application/json" },
    });
    // do something if success
    console.log(data);
    window.location.href = "/login";
  }
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          required
          type="text"
          value={firstName}
          variant="outlined"
          placeholder="username"
          onChange={(e) => setFirstName(e.target.value)}
        ></TextField>
        <TextField
          required
          type="text"
          value={LastName}
          variant="outlined"
          placeholder="username"
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
          min
          type="password"
          value={password1}
          placeholder="password"
          onChange={(e) => setPassword1(e.target.value)}
        ></TextField>
        <TextField
          required
          type="password"
          value={password2}
          placeholder="confirm password"
          onChange={(e) => setPassword2(e.target.value)}
        ></TextField>
        <Button type="submit">Register</Button>
      </Box>
    </>
  );
}
