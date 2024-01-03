import React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function RegisterPage() {
  return (
    <>
      <Box>
        <TextField variant="outlined"></TextField>
        <TextField variant="outlined"></TextField>
        <TextField value="outlined"></TextField>
        <Button type="submit">Register</Button>
      </Box>
    </>
  );
}
