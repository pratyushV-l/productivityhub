"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';
import TodoList from "./components/TodoList";
import Timer from "./components/Timer";
import NoteTaker from "./components/NoteTaker";

const colors = ["#FF929F", "#FFAC92", "#FFD392", "#92FFB0", "#92F2FF", "#92CAFF", "#A192FF", "#DC92FF"];

export default function Home() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change color every second
    return () => clearInterval(interval);
  }, []);

  const openPopup = (popup: string) => {
    setActivePopup(popup);
    document.querySelectorAll('.tile').forEach((tile) => {
      (tile as HTMLDivElement).style.backgroundColor = "#1E1E1E";
      (tile.querySelector('h3') as HTMLHeadingElement).style.backgroundColor = 'transparent';
      (tile.querySelector('h3') as HTMLHeadingElement).style.color = 'var(--foreground)';
    });
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  const handleTileMouseEnter = useCallback(debounce((e: React.MouseEvent<HTMLDivElement>) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    (e.target as HTMLDivElement).style.backgroundColor = randomColor;
    
    const h3Element = (e.target as HTMLDivElement).querySelector('h3') as HTMLHeadingElement;
    if (h3Element) {
      h3Element.style.color = "#262626";
    }
  
    document.querySelectorAll('.tile').forEach((tile) => {
      if (tile !== e.target) {
        (tile as HTMLDivElement).style.backgroundColor = "#1E1E1E";
        const tileH3Element = tile.querySelector('h3') as HTMLHeadingElement;
        if (tileH3Element) {
          tileH3Element.style.backgroundColor = 'transparent';
          tileH3Element.style.color = 'var(--foreground)';
        }
      }
    });
  }, 10), []);

  const handleTileMouseLeave = useCallback(debounce((e: React.MouseEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).style.backgroundColor = "#1E1E1E";
    
    const h3Element = (e.target as HTMLDivElement).querySelector('h3') as HTMLHeadingElement;
    if (h3Element) {
      h3Element.style.color = 'var(--foreground)';
    }
  }, 10), []);

  const handleTitleMouseEnter = useCallback(debounce(() => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    document.querySelectorAll('h3').forEach((element) => {
      (element as HTMLElement).style.backgroundColor = 'transparent';
    });
  }, 10), []);

  return (
    <div className="container">
      <h1 className="title" style={{ color: colors[colorIndex] }} onMouseEnter={handleTitleMouseEnter}>
        onlyProductivity
      </h1>
      <div className="grid grid-cols-7 sm:grid-cols-4 gap-5">
        <div className="tile large" onClick={() => openPopup("todo")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Todo List</h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("timer")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Timer</h3>
        </div>
        <div className="tile thin" onClick={() => openPopup("note")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Note Taker</h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("extra1")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 1</h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("extra2")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 2</h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("extra3")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 3</h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("extra4")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 4</h3>
        </div>
        <div className="tile large" onClick={() => openPopup("extra5")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 5</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra6")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 6</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra7")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 7</h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("extra8")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Extra Feature 8</h3>
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
              {activePopup === "extra3" && <div>Extra Feature 3 Content</div>}
              {activePopup === "extra4" && <div>Extra Feature 4 Content</div>}
              {activePopup === "extra5" && <div>Extra Feature 5 Content</div>}
              {activePopup === "extra6" && <div>Extra Feature 6 Content</div>}
              {activePopup === "extra7" && <div>Extra Feature 7 Content</div>}
              {activePopup === "extra8" && <div>Extra Feature 8 Content</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}