// src/Components/Popup/BirthdayPopup.js
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function BirthdayPopup({ open, onClose, userName }) {
  const { width, height } = useWindowSize();

  return (
    <>
      {open && <Confetti width={width} height={height} numberOfPieces={400} recycle={false} />}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>🎉 Happy Birthday!</DialogTitle>
        <DialogContent>
          <p>Wishing you a wonderful year ahead, {userName} 🎂✨</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="primary">
            Thank You
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
