import { React, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    //fetching data
    const {data} = (
      await axios.post("http://localhost:8000/api/token/", user, {
        headers: { "Content-Type": "application/json" },
      }, {withCredentials: true})
    )
    console.log(data.data);
    const accessToken = await data["access"]; // <--getting access token
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    // setting default global headers with AUTH-Token
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    //set current window to home
    window.location.href = "/";
  }
  return (
    <>
      <Box
        sx={{ backgroundColor: "white" }}
        component="form"
        onSubmit={handleSubmit}
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
}
