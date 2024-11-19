'use client';

import React, { useState, useEffect } from "react";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("/api/quote");
      const data = await response.json();
      setQuote(data[0].q);
      setAuthor(data[0].a);
      setError(null);
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setError("Failed to fetch quote. Please try again later.");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '12.5%',
        color: 'white',
        left: '12.5%',
        width: '50%',
        height: '50%',
        backgroundColor: '#262626',
        overflow: 'auto',
        padding: '20px',
        transform: "translate(+25%, +25%)",
        boxSizing: 'border-box',
        zIndex: 1000,
        borderRadius: '10px',
      }}
    >
      {error ? (
        <p>{error}</p>
      ) : quote ? (
        <blockquote style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '2em', flexGrow: 1 }}>"{quote}"</p>
          <footer style={{ textAlign: 'right', marginTop: '10px' }}>
            - {author}
          </footer>
        </blockquote>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={fetchQuote}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24px"
          height="24px"
        >
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      </button>
    </div>
  );
};

export default Quote;