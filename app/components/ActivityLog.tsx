import React, { useState } from "react";

const ActivityLog = ({ buttonColor }: { buttonColor: string }) => {
  const [logs, setLogs] = useState<{ log: string; timestamp: string }[]>([]);
  const [newLog, setNewLog] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addLog = () => {
    if (newLog.trim()) {
      const timestamp = new Date().toLocaleString();
      setLogs([{ log: newLog, timestamp }, ...logs]);
      setNewLog("");
    }
  };

  const editLog = () => {
    if (newLog.trim() && editIndex !== null) {
      const updatedLogs = logs.map((log, index) =>
        index === editIndex ? { ...log, log: newLog } : log
      );
      setLogs(updatedLogs);
      setNewLog("");
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (isEditing) {
        editLog();
      } else {
        addLog();
      }
    }
  };

  const deleteLog = (index: number) => {
    setLogs(logs.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setNewLog(logs[index].log);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Activity Log</h2>
      <input
        type="text"
        value={newLog}
        onChange={(e) => setNewLog(e.target.value)}
        onKeyDown={handleKeyDown}
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
        onClick={isEditing ? editLog : addLog}
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
        {isEditing ? "Edit Log" : "Add Log"}
      </button>
      <ul>
        {logs.map((log, index) => (
          <li key={index} style={{ marginBottom: "10px", fontSize: "18px", display: "flex", alignItems: "center" }}>
            {log.log} <span style={{ fontSize: "12px", color: "#888", marginLeft: "10px" }}>({log.timestamp})</span>
            <button
              onClick={() => startEditing(index)}
              style={{
                marginLeft: "10px",
                background: "none",
                border: "none",
                color: "#FFD392",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✎
            </button>
            <button
              onClick={() => deleteLog(index)}
              style={{
                marginLeft: "10px",
                background: "none",
                border: "none",
                color: "#FF929F",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;