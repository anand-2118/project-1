import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Box, Button, Card, CardContent } from "@mui/material";
import Counter from "../components/Counter/Counter";
import UserDataForm from "../components/UserDataForm/UserDataForm";
import RichTextEditor from "../components/RichTextEditor/RichTextEditor";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, bgcolor: "#1976d2", color: "white" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Upliance.ai
        </Typography>
        <Typography variant="subtitle1">
          Your AI-powered solution for seamless content and user engagement.
        </Typography>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="contained" color="primary" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </Box>

      <Box sx={{ my: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Interactive Counter
            </Typography>
            <Counter />
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <CardContent>
            <UserDataForm />
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <CardContent>
            <RichTextEditor />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home;
