import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

const isAdmin = true;

const AdminLogin = () => {
    const secretKey = useInputValidation("");

  const submitHanlder = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  if(isAdmin) return <Navigate to="/admin/dashboard"/>;
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(200,200,200,0.5), rgba(120,110,220,0.5))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHanlder}
          >
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "1rem" }}
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
