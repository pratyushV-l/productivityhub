import React, { useState, useEffect } from "react";

interface Habit {
    name: string;
    frequency: string;
    completed: boolean;
    streak: number;
}

const HabitTracker = ({ buttonColor }: { buttonColor: string}) => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [newHabit, setNewHabit] = useState<string>("")
    const [frequency, setFrequency] = useState<string>("Daily");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const completedHabits = habits.filter(habit => habit.completed).length;
        setProgress((completedHabits/habits.length)*100);
    }, [habits]);

    const addHabit = () => {
        if (newHabit.trim()) {
            const newHabits = [...habits];
            if (editIndex !== null) {
                newHabits[editIndex] = { name: newHabit, frequency, completed: false, streak: 0};
                setEditIndex(null);
            } else {
                newHabits.push({ name: newHabit, frequency, completed: false, streak: 0});
            }
            setHabits(newHabits);
            setNewHabit("");
            setFrequency("Daily");
        }
    };

    const deleteHabit = (index: number) => {
        setHabits(habits.filter((_, i) => i !== index));
    };

    const toggleCompletion = (index: number) => {
        const updatedHabits = habits.map((habit, i) => {
            if (i === index) {
                const updatedHabit = { ...habit, completed: !habit.completed};
                if (updatedHabit.completed) {
                    updatedHabit.streak +=1
                } else {
                    updatedHabit.streak = 0;
                }
                return updatedHabit;
            }
            return habit;
        });
        setHabits(updatedHabits);
    };

    const startEditing = (index: number) => {
        setNewHabit(habits[index].name);
        setFrequency(habits[index].frequency);
        setEditIndex(index);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px"}}>
            <h2 style={{ textAlign: "center", marginBottom: "20px"}}>Habit Tracker</h2>
            <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter New Habit"
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "262626",
                    color: "#262626",
                }}
            />
            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#262626",
                    color: "#fff",
                }}
            >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
            <button
                onClick={addHabit}
                style={{
                    backgroundColor: buttonColor,
                    color: "#262626",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    marginBottom: "20px",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.5s ease, color 0.5s ease",
                }}
                >
                    {editIndex !== null ? "Edit Habit" : "Add Habit"}
                </button>
                <div style={{ width: "100%", marginBottom: "20px" }}>
        <div style={{ width: "100%", backgroundColor: "#ccc", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, backgroundColor: buttonColor, height: "10px", transition: "background-color 0.5 ease" }}></div>
        </div>
        <p style={{ textAlign: "center", marginTop: "10px", color: "#fff" }}>{Math.round(progress)}% Completed</p>
      </div>
      <ul style={{ width: "100%", listStyle: "none", padding: 0 }}>
        {habits.map((habit, index) => (
          <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ textDecoration: habit.completed ? "line-through" : "none" }}>{habit.name} ({habit.frequency})</span>
            <div>
              <button onClick={() => toggleCompletion(index)} style={{ marginRight: "10px" }}>
                {habit.completed ? "✖" : "✔"}
              </button>
              <span style={{ marginRight: "10px", color: "#fff" }}>Streak: {habit.streak}</span>
              <button onClick={() => startEditing(index)} style={{ marginRight: "10px" }}>Edit</button>
              <button onClick={() => deleteHabit(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;