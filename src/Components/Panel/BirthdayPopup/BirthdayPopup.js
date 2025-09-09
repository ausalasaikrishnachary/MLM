// src/Components/Popup/BirthdayPopup.js
import React from "react";
import { baseurl } from '../../../Components/BaseURL/BaseURL';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function BirthdayPopup({ open, onClose, userName }) {
  return (
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
  );
}
