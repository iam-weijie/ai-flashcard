"use client";

import Deck from "@/components/Deck";
import { Box, Button, Link, Paper, TextField } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      const data = await response.json();
      setCards(data || []);
    } catch (e) {
      console.error("Error fetching flashcards:", e);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 10,
          p: 2,
          zIndex: 10,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Link href="https://github.com/iam-weijie/ai-flashcard">
          <Image src="/logo.png" alt="Swipe2Learn" width={100} height={100} />
        </Link>
      </Box>

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
          Generate flashcards
        </Button>
      </Paper>

      <div id="root" style={{ paddingTop: "30px" }}>
        <Deck data={cards} />
      </div>
    </>
  );
}
