import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Container, Button, Typography, Box, Avatar, Card, CardContent, Paper } from "@mui/material";
import { animated, useSpring } from "react-spring";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnimatedPaper = animated(Paper);

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [count, setCount] = useState(0);

  const backgroundStyle = useSpring({
    backgroundColor: `rgba(0, 100, 200, ${Math.min(count / 20, 1)})`,
    config: { tension: 210, friction: 20 },
  });

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Login Activity",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [1, 3, 2, 4, 5, 2, 3], 
      },
    ],
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <AnimatedPaper
        elevation={4}
        style={{
          ...backgroundStyle,
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {count}
        </Typography>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCount(count + 1)}
            sx={{ mr: 1 }}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => setCount(count - 1)}
            sx={{ mr: 1 }}
          >
            Decrement
          </Button>
          <Button variant="contained" color="error" onClick={() => setCount(0)}  sx={{ mt: 2 }}>
            Reset
          </Button>
        </Box>
      </AnimatedPaper>

      {user && (
        <Card sx={{ mt: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6">Welcome, {user.displayName || "User"}</Typography>
            <Box display="flex" alignItems="center" mt={2}>
              {user.photoURL && <Avatar src={user.photoURL} sx={{ width: 80, height: 80, mr: 2 }} />}
              <Typography variant="body1">Email: {user.email}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant="h6">User Login Trends</Typography>
          <Bar data={chartData} />
        </CardContent>
      </Card>

      <Button variant="contained" color="secondary" onClick={logout} sx={{ mt: 3, p: 2, mb:3 }}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
