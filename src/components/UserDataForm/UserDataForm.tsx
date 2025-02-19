import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Container, Typography, Box } from "@mui/material";

const UserDataForm: React.FC = () => {
  const [formData, setFormData] = useState({
    id: Math.random().toString(36).substring(7),
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("userData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setUnsavedChanges(false);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data saved!");
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        alert("You have unsaved changes. Are you sure you want to leave?");

      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Data Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
          <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
          <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth />

          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserDataForm;
