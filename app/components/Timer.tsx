'use client'

import React, { useState, useEffect } from "react";

const Timer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => Math.max(prevTime - 10, 0));
            }, 10);
        } else if (time === 0) {
            setIsRunning(false);
        }
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        };
    }, [isRunning, time]);

    const handleStartPause = () => {
        if (!isRunning && time === 0) {
            const totalTime = ((hours * 3600) + (minutes * 60) + seconds) * 1000;
            setTime(totalTime);
            setTotalTime(totalTime);
        }
        setIsRunning(!isRunning)
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setTotalTime(0);
    };

    const formatTime = (time: number) => {
        if (time == 0) {
            return "00:00:00";
        }
        time += 1000;
        const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = Math.floor(time / 60000);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    const calculateProgress = () => {
        return totalTime ? ((totalTime - time) / totalTime) * 100 : 0;
    };

    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Timer</h2>
            <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '20px' }}>
                <svg width="220" height="220">
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#262626"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#ffffff"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (calculateProgress() / 100) * circumference}
                        transform="rotate(-90 110 110)"
                    />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px' }}>
                    {formatTime(time)}
                </div>
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <select
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    size={2}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#262626",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                        transition: "background-color 1s, color 1s",
                        maxHeight: "150px",
                        overflowY: "auto",
                        display: "block",
                    }}
                >
                    {Array.from({ length: 24 }, (_, i) => (
                        <option key={i} value={i} style={{ backgroundColor: "#262626", color: "#ffffff" }}>{i}</option>
                    ))}
                </select>
                <select
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    size={2}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#262626",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                        transition: "background-color 1s, color 1s",
                        maxHeight: "150px",
                        overflowY: "auto",
                        display: "block"
                    }}
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i} style={{ backgroundColor: "#262626", color: "#ffffff" }}>{i}</option>
                    ))}
                </select>
                <select
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                    size={2}
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#262626",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                        transition: "background-color 1s, color 1s",
                        maxHeight: "150px",
                        overflowY: "auto",
                        display: "block"
                    }}
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i} style={{ backgroundColor: "#262626", color: "#ffffff" }}>{i}</option>
                    ))}
                </select>
            </div>
            <div>
                <button
                    onClick={handleStartPause}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#92FFB0",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#FF929F",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isRunning, time]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(!isRunning);
        setTime(0);
    };

    const formatTime = (time: number) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Stopwatch</h2>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {formatTime(time)}
            </div>
            <div>
                <button
                    onClick={handleStartPause}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#92FFB0",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#FF929F",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const PomodoroTimer = () => {
    const [time, setTime] = useState(1500); // 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const totalTime = 1500;

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);
        } else if (time === 0) {
            setIsRunning(false);
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isRunning, time]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(totalTime);
    };

    const formatTime = (time: number) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    const calculateProgress = () => {
        return ((totalTime - time) / totalTime) * 100;
    };

    const radius = 100;
    const circumference = 2 * Math.PI * radius;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Pomodoro Timer</h2>
            <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '20px' }}>
                <svg width="220" height="220">
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#262626"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#ffffff"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (calculateProgress() / 100) * circumference}
                        transform="rotate(-90 110 110)"
                    />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '48px' }}>
                    {formatTime(time)}
                </div>
            </div>
            <div>
                <button
                    onClick={handleStartPause}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#92FFB0",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button
                    onClick={handleReset}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: "#262626",
                        backgroundColor: "#FF929F",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );  
};

const TimerApp = () => {
    const [activeTab, setActiveTab] = useState('timer');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveTab('timer')}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: activeTab === 'timer' ? "#262626" : "#ffffff",
                        backgroundColor: activeTab === 'timer' ? "#FFD392" : "#1E1E1E",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Timer
                </button>
                <button
                    onClick={() => setActiveTab('stopwatch')}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: activeTab === 'stopwatch' ? "#262626" : "#ffffff",
                        backgroundColor: activeTab === 'stopwatch' ? "#FFD392" : "#1E1E1E",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginRight: "10px",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Stopwatch
                </button>
                <button
                    onClick={() => setActiveTab('pomodoro')}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        color: activeTab === 'pomodoro' ? "#262626" : "#ffffff",
                        backgroundColor: activeTab === 'pomodoro' ? "#FFD392" : "#1E1E1E",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    Pomodoro
                </button>
            </div>
            {activeTab === 'timer' && <Timer />}
            {activeTab === 'stopwatch' && <Stopwatch />}
            {activeTab === 'pomodoro' && <PomodoroTimer />}
        </div>
    );
};

export default TimerApp;