"use client";

import Deck from "@/components/Deck";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import "./Deck.css";

export default function Home() {
  const [text, setText] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Show loader
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: text,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      setCards(data || []);
    } catch (e) {
      console.error("Error fetching flashcards:", e);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 40,
          p: 1,
          zIndex: 10,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Link href="https://github.com/iam-weijie/ai-flashcard">
          <Image src="/logo.png" alt="Swipe2Learn" width={80} height={80} />
        </Link>
      </Box>
      <Typography
        variant="h5"
        fontSize={20}
        sx={{
          display: {
            xs: "none",
            sm: "block",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        Swipe2Learn
      </Typography>

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

      {loading && <div className="loader"></div>}

      <div id="root">
        <Deck data={cards} />
      </div>
    </>
  );
}
