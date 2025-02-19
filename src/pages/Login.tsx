import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const Login: React.FC = () => {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4, textAlign: "center", bgcolor: "#F8F3D9", minHeight: "70vh", py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        fullWidth
        margin="normal"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Box mt={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Login with Email
        </Button>
      </Box>

      <Box mt={1}>
        <Button variant="contained" color="secondary" fullWidth onClick={signInWithGoogle}>
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
