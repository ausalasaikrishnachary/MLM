import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { baseurl } from "../../../BaseURL/BaseURL";

const ChatbotPopup = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Please enter Hi/Hello to start conversation.", fromBot: true },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOtherMode, setIsOtherMode] = useState(false); // ✅ Track if user selected "Other"

  const handleSend = async (text = input, questionId = null) => {
    if (!text && !questionId) return;

    // Add user message
    if (text) {
      const userMessage = { id: Date.now(), text, fromBot: false };
      setMessages((prev) => [...prev, userMessage]);
    }

    setInput("");
    setLoading(true);

    try {
      let response;

      // ✅ If user is typing a custom question after selecting "Other"
      if (isOtherMode && !questionId) {
        response = await axios.post(`${baseurl}/chatbot/`, {
          message: text,
          is_other: true,
        });
        setIsOtherMode(false); // reset mode after sending
      } 
      else if (questionId) {
        // Regular flow: send question ID
        response = await axios.post(`${baseurl}/chatbot/`, {
          message: String(questionId),
        });
      } 
      else {
        // Regular flow: send text
        response = await axios.post(`${baseurl}/chatbot/`, {
          message: text,
        });
      }

      const botResponse = response.data.response || "Sorry, I didn't understand that.";
      let questions = response.data.questions || [];

      // ✅ Reorder questions: move "Other" to the end
      questions = [
        ...questions.filter((q) => q.question.toLowerCase() !== "other"),
        ...questions.filter((q) => q.question.toLowerCase() === "other"),
      ];

      // Add bot response message
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: botResponse, fromBot: true, questions },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Error: Unable to reach the server.", fromBot: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    if (question.question.toLowerCase() === "other") {
      // ✅ Trigger "Other" mode
      setIsOtherMode(true);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Please type your question, and we'll send it to our support team.",
          fromBot: true,
        },
      ]);
    } else {
      // Regular question click
      handleSend("", question.id);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 300,
        height: 400,
        zIndex: 1500,
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            bgcolor: "#1976d2",
            color: "white",
          }}
        >
          <Typography variant="subtitle1">Chatbot</Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                mb: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: msg.fromBot ? "flex-start" : "flex-end",
              }}
            >
              <Paper
                sx={{
                  p: 1,
                  bgcolor: msg.fromBot ? "#f1f1f1" : "#1976d2",
                  color: msg.fromBot ? "black" : "white",
                  maxWidth: "80%",
                }}
              >
                {msg.text}
              </Paper>

              {/* Display question buttons */}
              {msg.questions &&
                msg.questions.map((q) => (
                  <Button
                    key={q.id}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 0.5, textTransform: "none" }}
                    onClick={() => handleQuestionClick(q)}
                  >
                    {q.question}
                  </Button>
                ))}
            </Box>
          ))}

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
              <CircularProgress size={20} />
              <Typography sx={{ ml: 1 }}>Bot is typing...</Typography>
            </Box>
          )}
        </Box>

        {/* Input */}
        <Box sx={{ display: "flex", p: 1 }}>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            size="small"
            fullWidth
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <IconButton color="primary" onClick={() => handleSend()}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPopup;
