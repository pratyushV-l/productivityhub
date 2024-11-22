import React, { useState } from "react";

interface Note {
  title: string;
  content: string;
  creationDate: Date;
}

const NoteTaker = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentView, setCurrentView] = useState<
    "mainMenu" | "writeContent" | "viewNotes" | "viewNote" | "editNote"
  >("mainMenu");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (title.trim()) {
      setCurrentView("writeContent");
    }
  };

  const addNote = () => {
    if (content.trim()) {
      const newNote: Note = {
        title,
        content,
        creationDate: new Date(),
      };
      setNotes([...notes, newNote]);
      setTitle("");
      setContent("");
      setCurrentView("mainMenu");
    }
  };

  const viewNotes = () => {
    setCurrentView("viewNotes");
  };

  const viewNote = (note: Note, index: number) => {
    setSelectedNote(note);
    setSelectedNoteIndex(index);
    setCurrentView("viewNote");
  };

  const goBack = () => {
    setCurrentView("mainMenu");
    setSelectedNote(null);
    setSelectedNoteIndex(null);
    setTitle("");
    setContent("");
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false);
  };

  const editNote = () => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setCurrentView("editNote");
    }
  };

  const saveEditedNote = () => {
    if (selectedNoteIndex !== null && title.trim() && content.trim()) {
      const updatedNotes = [...notes];
      updatedNotes[selectedNoteIndex] = {
        ...updatedNotes[selectedNoteIndex],
        title,
        content,
      };
      setNotes(updatedNotes);
      setTitle("");
      setContent("");
      setSelectedNote(null);
      setSelectedNoteIndex(null);
      setCurrentView("viewNotes");
    }
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      {currentView === "mainMenu" && (
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "20px" }}>Note Taker</h2>
          <input
            type="text"
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#262626",
              color: "#fff",
            }}
          />
          <button
            onClick={handleNext}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FFD392",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          >
            Add Note
          </button>
          <button
            onClick={viewNotes}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#92FFB0",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Notes
          </button>
        </div>
      )}
      {currentView === "writeContent" && (
        <div>
          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>{title}</h2>
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() => applyFormat("bold")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => applyFormat("italic")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <i>I</i>
            </button>
            <button
              onClick={() => applyFormat("underline")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <u>U</u>
            </button>
          </div>
          <div
            contentEditable
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "10px",
              backgroundColor: "#262626",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          ></div>
          <button
            onClick={addNote}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FFD392",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Submit
          </button>
          <button
            onClick={goBack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FF929F",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
      {currentView === "viewNotes" && (
        <div>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>My Notes</h2>
          {notes.length === 0 ? (
            <p style={{ textAlign: "center" }}>No notes available.</p>
          ) : (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {notes.map((note, index) => (
                <li
                  key={index}
                  onClick={() => viewNote(note, index)}
                  style={{
                    backgroundColor: "#1E1E1E",
                    padding: "15px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                >
                  <h3 style={{ margin: "0 0 5px 0", color: "#FFD392" }}>
                    {note.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                    {note.creationDate.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={goBack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FFD392",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Back
          </button>
        </div>
      )}
      {currentView === "viewNote" && selectedNote && (
        <div>
          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
            {selectedNote.title}
          </h2>
          <div
            style={{
              backgroundColor: "#1E1E1E",
              padding: "15px",
              borderRadius: "5px",
              color: "#fff",
            }}
            dangerouslySetInnerHTML={{ __html: selectedNote.content }}
          ></div>
          <button
            onClick={editNote}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#92FFB0",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              marginRight: "10px",
            }}
          >
            Edit
          </button>
          <button
            onClick={goBack}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FFD392",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Done
          </button>
        </div>
      )}
      {currentView === "editNote" && (
        <div>
          <input
            type="text"
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "#262626",
              color: "#fff",
            }}
          />
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() => applyFormat("bold")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <b>B</b>
            </button>
            <button
              onClick={() => applyFormat("italic")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <i>I</i>
            </button>
            <button
              onClick={() => applyFormat("underline")}
              style={{
                padding: "5px",
                fontSize: "16px",
                marginRight: "5px",
                backgroundColor: "#1E1E1E",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              <u>U</u>
            </button>
          </div>
          <div
            contentEditable
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            style={{
              width: "100%",
              minHeight: "200px",
              padding: "10px",
              backgroundColor: "#262626",
              color: "#fff",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <button
            onClick={saveEditedNote}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#92FFB0",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setTitle("");
              setContent("");
              setSelectedNote(null);
              setSelectedNoteIndex(null);
              setCurrentView("viewNotes");
            }}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#262626",
              backgroundColor: "#FF929F",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteTaker;