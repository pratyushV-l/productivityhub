"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';
import Timer from "./components/Timer";
import NoteTaker from "./components/NoteTaker";
import Quote from "./components/Quote";
import ActivityLog from "./components/ActivityLog";

const colors = ["#FF929F", "#FFAC92", "#FFD392", "#92FFB0", "#92F2FF", "#92CAFF", "#A192FF", "#DC92FF"];

export default function Home() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const circle = document.querySelector('.blurred-circle') as HTMLElement;
    const circle2 = document.querySelector('.blurred-circle-2') as HTMLElement;
    const circle3 = document.querySelector('.blurred-circle-3') as HTMLElement;

    if(circle){
      circle.style.backgroundColor = `${colors[colorIndex]}40`; // Adding opacity
    }

    if(circle2){
      circle2.style.backgroundColor = `${colors[(colorIndex + 2) % colors.length]}40`; // Different color with opacity
    }

    if(circle3){
      circle3.style.backgroundColor = `${colors[(colorIndex + 4) % colors.length]}40`; // Another distinct color with opacity
    }
  }, [colorIndex]);

  useEffect(() => {
    const circle = document.querySelector('.blurred-circle') as HTMLElement;

    const moveCircle = () => {
      const x = Math.random() * (window.innerWidth);
      const y = Math.random() * (window.innerHeight);
      circle.style.transform = `translate(${x}px, ${y}px)`;
    };

    moveCircle();

    const interval = setInterval(moveCircle, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const circle2 = document.querySelector('.blurred-circle-2') as HTMLElement;

    const moveCircle2 = () => {
      const x = Math.random() * (window.innerWidth);
      const y = Math.random() * (window.innerHeight);
      circle2.style.transform = `translate(${x}px, ${y}px)`;
    };

    moveCircle2();

    const interval2 = setInterval(moveCircle2, 1500);

    return () => clearInterval(interval2);
  }, []);

  useEffect(() => {
    const circle3 = document.querySelector('.blurred-circle-3') as HTMLElement;

    const moveCircle3 = () => {
      const x = Math.random() * (window.innerWidth);
      const y = Math.random() * (window.innerHeight);
      circle3.style.transform = `translate(${x}px, ${y}px)`;
    };

    moveCircle3();

    const interval3 = setInterval(moveCircle3, 500);

    return () => clearInterval(interval3);
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
    const target = e.target as HTMLDivElement;
    target.style.backgroundColor = randomColor;
    target.style.boxShadow = `0 0 10px ${randomColor}`; 

    const h3Element = target.querySelector('h3') as HTMLHeadingElement;
    if (h3Element) {
      h3Element.style.color = "#262626";
    }

    document.querySelectorAll('.tile').forEach((tile) => {
      if (tile !== target) {
        (tile as HTMLDivElement).style.backgroundColor = "#1E1E1E";
        const tileH3Element = tile.querySelector('h3') as HTMLHeadingElement;
        if (tileH3Element) {
          tileH3Element.style.backgroundColor = 'transparent';
          tileH3Element.style.color = 'var(--foreground)';
        }
        ((tile as HTMLDivElement)).style.boxShadow = 'none'; 
      }
    });
  }, 10), []);

  const handleTileMouseLeave = useCallback(debounce((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    target.style.backgroundColor = "#1E1E1E";
    target.style.boxShadow = 'none'; 

    const h3Element = target.querySelector('h3') as HTMLHeadingElement;
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
      <div className="blurred-circle"></div>
      <div className="blurred-circle-2"></div>
      <div className="blurred-circle-3"></div>
      <h1
        className="title"
        style={{
          color: colors[colorIndex],
          textShadow: `0 0 40px ${colors[colorIndex]}80`,
          userSelect: 'none', // Prevent text selection
          pointerEvents: 'none', // Make non-interactable
        }}
        onMouseEnter={handleTitleMouseEnter}
      >
        onlyProductivity
      </h1>
      <div className="grid grid-cols-7 sm:grid-cols-4 gap-5">
        <div className="tile large" onClick={() => openPopup("quote")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Motivational Quote</h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("ActivityLogs")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Action Logs</h3>
        </div>
        <div className="tile thin" onClick={() => openPopup("note")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Timer</h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("extra1")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>To-Do List</h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("extra2")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Calender</h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("extra3")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Habit Tracker</h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("extra4")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>AI Assistant</h3>
        </div>
        <div className="tile large" onClick={() => openPopup("extra5")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Note Taker</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra6")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Meditation</h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra7")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Music</h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("extra8")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3>Sticky Notes</h3>
        </div>
        {activePopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}></button>
              {activePopup === "quote" && <Quote />}
              {activePopup === "timer" && <Timer />}
              {activePopup === "note" && <NoteTaker />}
              {activePopup === "ActivityLogs" && <ActivityLog buttonColor={colors[colorIndex]} />}
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