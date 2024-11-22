"use client";

import React, { useState, useEffect } from 'react';

interface MeditationProps {
  buttonColor: string;
}

const Meditation: React.FC<MeditationProps> = ({ buttonColor }) => {
  const [totalTime, setTotalTime] = useState<number>(5); // Total meditation time in minutes
  const [breaths, setBreaths] = useState<number>(10); // Number of breaths
  const [started, setStarted] = useState<boolean>(false);
  const [isInhale, setIsInhale] = useState<boolean>(true);
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (started) {
      const inhaleExhaleTime = ((totalTime * 60 * 1000) / breaths) / 2;
      setAnimationTime(inhaleExhaleTime);
    }
  }, [started, totalTime, breaths]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (started && animationTime > 0) {
      let startTime = Date.now();

      intervalId = setInterval(() => {
        const now = Date.now();
        const delta = now - startTime;
        startTime = now;
        setElapsedTime((prev) => prev + delta);

        if (elapsedTime >= totalTime * 60 * 1000) {
          clearInterval(intervalId);
          setStarted(false);
          setElapsedTime(0);
          setIsInhale(true);
        } else {
          setIsInhale((prev) => !prev);
        }
      }, animationTime);
    }
    return () => clearInterval(intervalId);
  }, [started, animationTime, elapsedTime, totalTime]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {!started ? (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Meditation</h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Total Time (minutes):</label>
            <input
              type="number"
              value={totalTime}
              onChange={(e) => setTotalTime(Number(e.target.value))}
              min={1}
              style={{ padding: '5px', width: '60px', color: '#262626', borderRadius: '4px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Number of Breaths:</label>
            <input
              type="number"
              value={breaths}
              onChange={(e) => setBreaths(Number(e.target.value))}
              min={1}
              style={{ padding: '5px', width: '60px', color: '#262626', borderRadius: '4px' }}
            />
          </div>
          <button
            onClick={() => setStarted(true)}
            style={{
              backgroundColor: buttonColor,
              color: '#262626',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.5s ease, color 0.5s ease',
            }}
          >
            Begin
          </button>
        </div>
      ) : (
        <div
          style={{
            position: 'relative',
            height: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="breathing-circle"
            style={{
              width: '250px',
              height: '250px',
              backgroundColor: buttonColor,
              borderRadius: '50%',
              animation: `${isInhale ? 'inhale' : 'exhale'} ${animationTime}ms linear infinite`,
            }}
          ></div>
          <style>{`
            @keyframes inhale {
              0% { transform: scale(0.1); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes exhale {
              0% { transform: scale(1); opacity: 1; }
              100% { transform: scale(0.1); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Meditation;