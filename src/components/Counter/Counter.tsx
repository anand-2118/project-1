import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import { Button, Typography, Paper, Box } from "@mui/material";

const AnimatedPaper = animated(Paper);

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  const backgroundStyle = useSpring({
    backgroundColor: `rgba(0, 100, 200, ${Math.min(count / 20, 1)})`,
    config: { tension: 210, friction: 20 },
  });

  return (
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
        <Button
          variant="contained"
          color="error"
          onClick={() => setCount(0) }
          sx={{ mt: 2 }}
        >
          Reset
        </Button>
      </Box>
    </AnimatedPaper>
  );
};

export default Counter;
