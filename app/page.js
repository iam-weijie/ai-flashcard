"use client";

import Deck from "@/components/Deck";
import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);

  const handleSubmit = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      body: text,
    });

    const data = await response.json();
    setCards(data);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Paper
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          bgcolor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
          padding: 2,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
        elevation={3} // Optional: Adds a shadow to the Paper
      >
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter a topic"
          multiline
          rows={1}
          variant="outlined"
          sx={{ width: "300px" }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Generate
        </Button>
      </Paper>
      <div id="root" style={{ paddingTop: "50px" }}>
        <Deck data={cards} />
      </div>
    </div>
  );
}
