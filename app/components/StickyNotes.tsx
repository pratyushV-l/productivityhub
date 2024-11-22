import React, { useState } from "react";

interface StickyNote {
  id: number;
  heading: string;
  body: string;
  color: string;
}

const colors = ["#FF929F", "#FFAC92", "#FFD392", "#92FFB0", "#92F2FF", "#92CAFF", "#A192FF", "#DC92FF"];

interface StickyNotesProps {
  onClose: () => void;
}

const StickyNotes: React.FC<StickyNotesProps> = ({ onClose }) => {
  const [notes, setNotes] = useState<StickyNote[]>([]);
  const [heading, setHeading] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const addNote = () => {
    if (heading.trim() && body.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newNote: StickyNote = {
        id: Date.now(),
        heading,
        body,
        color: randomColor,
      };
      setNotes([newNote, ...notes]);
      setHeading("");
      setBody("");
      setShowForm(false);
    }
  };

  const removeNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Sticky Notes</h2>
        <button style={styles.toggleFormButton} onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Note"}
        </button>
        {showForm && (
          <div style={styles.form}>
            <input
              type="text"
              placeholder="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={styles.textarea}
            />
            <button onClick={addNote} style={styles.addButton}>
              Add Note
            </button>
          </div>
        )}
        <div style={styles.notesContainer}>
          {notes.map((note) => (
            <div key={note.id} style={{ ...styles.note, backgroundColor: note.color }}>
              <h3 style={styles.noteHeading}>{note.heading}</h3>
              <p style={styles.noteBody}>{note.body}</p>
              <button onClick={() => removeNote(note.id)} style={styles.deleteButton}>
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#1E1E1E",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90%",
    overflowY: "auto",
    position: "relative",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#FFD392",
  },
  toggleFormButton: {
    padding: "10px 20px",
    backgroundColor: "#FFD392",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#262626",
    transition: "background-color 0.3s",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "600px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#262626",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#262626",
    color: "#FFFFFF",
    fontSize: "16px",
    resize: "vertical",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#FFD392",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#262626",
    transition: "background-color 0.3s",
    alignSelf: "flex-end",
  },
  notesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "10px",
    width: "100%",
    maxHeight: "400px",
    overflowY: "auto",
  },
  note: {
    padding: "10px",
    borderRadius: "4px",
    position: "relative",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  noteHeading: {
    margin: "0 0 5px 0",
    fontSize: "18px",
    color: "#262626",
  },
  noteBody: {
    margin: 0,
    fontSize: "16px",
    color: "#262626",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexGrow: 1,
  },
  deleteButton: {
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    color: "#262626",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default StickyNotes;