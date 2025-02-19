import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Container, Typography, Paper } from "@mui/material";

const RichTextEditor: React.FC = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("richTextContent", content);
  }, [content]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Rich Text Editor
        </Typography>
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </Paper>
    </Container>
  );
};

export default RichTextEditor;
