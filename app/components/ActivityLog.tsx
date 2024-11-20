import React, { useState } from "react";

const ActivityLog = ({ buttonColor }: { buttonColor: string }) => {
  const [logs, setLogs] = useState<{ log: string; timestamp: string }[]>([]);
  const [newLog, setNewLog] = useState<string>("");

  const addLog = () => {
    if (newLog.trim()) {
      const timestamp = new Date().toLocaleString();
      setLogs([{ log: newLog, timestamp }, ...logs]);
      setNewLog("");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Activity Log</h2>
      <input
        type="text"
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        placeholder="Enter new activity"
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          color: "black",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={addLog}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "#262626",
          backgroundColor: buttonColor,
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
          marginTop: "15px",
          transition: "background-color 1s, color 1s",
        }}
      >
        Add Log
      </button>
      <ul>
        {logs.map((log, index) => (
          <li key={index} style={{ marginBottom: "10px", fontSize: "18px" }}>
            {log.log} <span style={{ fontSize: "12px", color: "#888" }}>({log.timestamp})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;