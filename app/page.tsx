"use client";

import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Timer from "./components/Timer";
import NoteTaker from "./components/NoteTaker";
import Image from "next/image";

const colors = ["#FF929F", "#FFAC92", "#FFD392", "#92FFB0", "#92F2FF", "#92CAFF", "#DC92FF", "#A192FF"];

export default function Home() {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  useEffect(() => {
    const tiles = document.querySelectorAll(".tile");
    const halfTiles = Math.floor(tiles.length / 2);
    const shuffledColors = colors.sort(() => 0.5 - Math.random());

    // Create an array of tile indices and shuffle it
    const tileIndices = Array.from(Array(tiles.length).keys()).sort(() => 0.5 - Math.random());

    // Assign random colors to half of the tiles
    tileIndices.slice(0, halfTiles).forEach((index) => {
      (tiles[index] as HTMLDivElement).style.backgroundColor = shuffledColors[index % shuffledColors.length];
      const tile = tiles[index] as HTMLDivElement;
      tile.style.color = "#262626"
    });
  }, []);

  const openPopup = (popup: string) => {
    setActivePopup(popup);
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleTitleMouseEnter = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    (e.target as HTMLHeadingElement).style.color = randomColor;
  };

  const handleTitleMouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    (e.target as HTMLHeadingElement).style.color = "#ffffff";
  };

  const handleTileMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    (e.target as HTMLDivElement).style.backgroundColor = randomColor;
  };

  const handleTileMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).style.backgroundColor = "#1E1E1E";
  };

  return (
    <div className="p-8">
      <h1 className="title" onMouseEnter={handleTitleMouseEnter} onMouseLeave={handleTitleMouseLeave}>productivityHub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="tile large" onClick={() => openPopup("todo")}>
          <h3>Todo List</h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("timer")}>
          <h3>Timer</h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("note")}>
          <h3>Note Taker</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra1")}>
          <h3>Extra Feature 1</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra2")}>
          <h3>Extra Feature 2</h3>
        </div>

        {activePopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}></button>
              {activePopup === "todo" && <TodoList />}
              {activePopup === "timer" && <Timer />}
              {activePopup === "note" && <NoteTaker />}
              {activePopup === "extra1" && <div>Extra Feature 1 Content</div>}
              {activePopup === "extra2" && <div>Extra Feature 2 Content</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}