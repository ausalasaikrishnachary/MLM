import React, { useState, useEffect } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { FaSearch, FaCrosshairs, FaMicrophone } from "react-icons/fa";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [listening, setListening] = useState(false);

  // Setup SpeechRecognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript); // fill input with recognized speech
      handleSearchClick(transcript); // trigger search
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => setListening(false);
  }

  const handleSearchClick = (value = query) => {
    console.log("Searching for:", value);
    // your search logic here
  };

  const handleMicClick = () => {
    if (recognition) {
      if (!listening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  return (
    <InputGroup className="custom-search-input">
      <Form.Control
        placeholder="Search property (e.g. villa, 2 bhk)"
        aria-label="search"
        className="py-2"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      <InputGroup.Text className="icon-group">
        <div
          className="icon-btn"
          onClick={() => handleSearchClick()}
          style={{ cursor: "pointer" }}
        >
          <FaSearch />
        </div>

        <div className="icon-btn">
          <FaCrosshairs />
        </div>

        <div
          className="icon-btn"
          onClick={handleMicClick}
          style={{ cursor: "pointer", color: listening ? "red" : "inherit" }}
        >
          <FaMicrophone />
        </div>
      </InputGroup.Text>
    </InputGroup>
  );
};

export default SearchBox;
