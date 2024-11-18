import React, { useEffect, useState } from "react";

const Quote = () => {
    const [quote, setQuote] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/quote")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.content && data.author) {
                    setQuote(`${data.content} — ${data.author}`);
                } else {
                    throw new Error("Invalid data format");
                }
            })
            .catch((error) => {
                console.error("Error fetching the quote:", error);
                setError("Failed to fetch quote. Please try again later.");
            });
    }, []);

    return (
        <div>
            <h2>Motivational Quote</h2>
            {error ? <p>{error}</p> : <p>{quote}</p>}
        </div>
    );
};

export default Quote;