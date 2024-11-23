"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

const Assistant = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage: Message = { sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage: Message = { sender: "assistant", text: data.reply };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error("Error in sendMessage:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff", display: "flex", flexDirection: "column", height: "100%" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>AI Assistant</h2>
      <div style={{ flexGrow: 1, overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: message.sender === "user" ? "right" : "left", margin: "10px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: message.sender === "user" ? "#FFD392" : "#1E1E1E",
                color: message.sender === "user" ? "#262626" : "#fff",
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: "10px",
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#262626",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            color: "#262626",
            backgroundColor: "#92FFB0",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px",
            fontSize: "16px",
            color: "#262626",
            backgroundColor: "#FF929F",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Assistant;