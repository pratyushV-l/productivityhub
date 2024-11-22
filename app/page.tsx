"use client";

import React, { useState, useEffect, useCallback } from "react";
import debounce from 'lodash.debounce';
import TimerApp from "./components/Timer";
import NoteTaker from "./components/NoteTaker";
import Quote from "./components/Quote";
import TodoList from "./components/TodoList";
import HabitTracker from "./components/HabitTracker";
import ActivityLog from "./components/ActivityLog";
import Meditation from "./components/Meditation";
import Calendar from "./components/Calender";

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
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
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
      const x = 0
      const y = 0
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
      h3Element.style.backgroundColor = "transparent";
      const svgElement = h3Element.querySelector('svg') as SVGElement;
      if (svgElement) {
        svgElement.style.backgroundColor = 'transparent';
      }
    }

    document.querySelectorAll('.tile').forEach((tile) => {
      if (tile !== target) {
        (tile as HTMLDivElement).style.backgroundColor = "#1E1E1E";
        const tileH3Element = tile.querySelector('h3') as HTMLHeadingElement;
        if (tileH3Element) {
          tileH3Element.style.backgroundColor = 'transparent';
          tileH3Element.style.color = 'var(--foreground)';
          tileH3Element.style.boxShadow = 'none';
          const svgElement = tileH3Element.querySelector('svg') as SVGElement;
          if (svgElement) {
            svgElement.style.backgroundColor = 'transparent';
          }
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
      h3Element.style.backgroundColor = "transparent";
      h3Element.style.boxShadow = 'none';
      const svgElement = h3Element.querySelector('svg') as SVGElement;
      if (svgElement) {
        svgElement.style.backgroundColor = 'transparent';
      }
    }
  }, 10), []);

  const handleTitleMouseEnter = useCallback(debounce(() => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    document.querySelectorAll('h3').forEach((element) => {
      (element as HTMLElement).style.backgroundColor = 'transparent';
    });
  }, 10), []);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    link.onload = () => {
      document.querySelectorAll('.font-loading').forEach((element) => {
        element.classList.remove('font-loading');
      });
    };
  }, []);

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
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            <span className="material-symbols-outlined" style={{ marginRight: '8px', fontSize: '48px', boxShadow: 'none'}}>
              bolt
            </span>
            Motivational Quote
          </h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("ActivityLogs")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Action Logs
            <span className="material-symbols-outlined" style={{ marginLeft: '8px', fontSize: '48px', boxShadow: 'none' }}>
              list
            </span>
          </h3>
        </div>
        <div className="tile thin" onClick={() => openPopup("timer")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Timer
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              timer
            </span>
          </h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("todo")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
            <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
              To-Do List
              <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
                fact_check
              </span>
            </h3>
        </div>
        <div className="tile wide" onClick={() => openPopup("calender")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            <span className="material-symbols-outlined" style={{marginRight: '8px', fontSize: '48px', boxShadow: 'none'}}>
              calendar_month
            </span>
            Calender
          </h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("habit")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Habit Tracker
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              routine
            </span>
          </h3>
        </div>
        <div className="tile tall" onClick={() => openPopup("extra4")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            <span className="material-symbols-outlined" style={{marginRight: '8px', fontSize: '48px', boxShadow: 'none'}}>
                network_intelligence
            </span>
            AI Assistant
          </h3>
        </div>
        <div className="tile large" onClick={() => openPopup("note")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Note Taker
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              description
            </span>
          </h3>
        </div>
        <div className="tile" onClick={() => openPopup("meditation")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Meditation
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              self_improvement
            </span>
          </h3>
        </div>
        <div className="tile" onClick={() => openPopup("extra7")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Music
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              music_note
            </span>
          </h3>
        </div>
        <div className="tile ewide" onClick={() => openPopup("extra8")} onMouseEnter={handleTileMouseEnter} onMouseLeave={handleTileMouseLeave}>
          <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="font-loading">
            Sticky Notes
            <span className="material-symbols-outlined" style={{marginLeft: '8px', fontSize: '48px', boxShadow: 'none'}}>
              sticky_note_2
            </span>
          </h3>
        </div>
        {activePopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}></button>
              {activePopup === "quote" && <Quote />}
              {activePopup === "timer" && <TimerApp />}
              {activePopup === "note" && <NoteTaker />}
              {activePopup === "ActivityLogs" && <ActivityLog buttonColor={colors[colorIndex]} />}
              {activePopup === "todo" && <TodoList buttonColor={colors[colorIndex]} />}
              {activePopup === "habit" && <HabitTracker buttonColor={colors[colorIndex]} />}
              {activePopup === "meditation" && <Meditation buttonColor={colors[colorIndex]} />}
              {activePopup === "calender" && <Calendar />}
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