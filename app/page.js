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
    <>
      <Paper sx={{ p: 4, width: "100%" }}>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter a topic"
          fullWidth
          multiline
          rows={1}
          variant="outlined"
          sx={{ mb: 2 }}
        ></TextField>
        <Button
          variant="contained"
          colors="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate
        </Button>
      </Paper>
      <div id="root">
        <Deck data={cards} />
      </div>
    </>
  );
}
