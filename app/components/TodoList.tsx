import React, { useState } from 'react';

interface Todo {
    text: string;
    deadline: string;
    importance: 'High' | 'Medium' | 'Low';
}

const TodoList = ({ buttonColor }: { buttonColor: string }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [importance, setImportance] = useState<'High' | 'Medium' | 'Low'>("Medium");
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const addTodo = () => {
        if (newTodo.trim()) {
            const todoDeadline = deadline.trim() ? deadline : "None";
            const newTodos = [...todos];
            if (editIndex !== null) {
                newTodos[editIndex] = { text: newTodo, deadline: todoDeadline, importance };
                setEditIndex(null);
            } else {
                newTodos.push({ text: newTodo, deadline: todoDeadline, importance });
            }
            newTodos.sort((a, b) => {
                const importanceOrder = { "High": 1, "Medium": 2, "Low": 3 };
                if (importanceOrder[a.importance] !== importanceOrder[b.importance]) {
                    return importanceOrder[a.importance] - importanceOrder[b.importance];
                }
                if (a.deadline === "None") return 1;
                if (b.deadline === "None") return -1;
                return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
            });
            setTodos(newTodos);
            setNewTodo("");
            setDeadline("");
            setImportance("Medium");
        }
    };

    const editTodo = (index: number) => {
        const todo = todos[index];
        setNewTodo(todo.text);
        setDeadline(todo.deadline === "None" ? "" : todo.deadline);
        setImportance(todo.importance);
        setEditIndex(index);
    };

    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTodo();
        }
    };

    const getBackgroundColor = (importance: 'High' | 'Medium' | 'Low') => {
        switch (importance) {
            case 'High':
                return '#FF929F';
            case 'Medium':
                return '#FFD392';
            case 'Low':
                return '#92FFB0';
            default:
                return '#1E1E1E';
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <style>
                {`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        filter: invert(1);
                    }
                `}
            </style>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Todo List</h2>
            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter new todo"
                style={{
                    width: "100%",
                    padding: "10px",
                    fontSize: "16px",
                    color: "#ffffff",
                    backgroundColor: "#262626",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    textAlign: "center",
                    transition: "background-color 1s, color 1s",
                }}
            />
            <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }}>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Deadline"
                    style={{
                        width: "50%",
                        padding: "10px",
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#262626",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                        transition: "background-color 1s, color 1s",
                        marginRight: "10px",
                    }}
                />
                <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as 'High' | 'Medium' | 'Low')}
                    style={{
                        width: "50%",
                        padding: "10px",
                        fontSize: "16px",
                        color: "#ffffff",
                        backgroundColor: "#262626",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        textAlign: "center",
                        transition: "background-color 1s, color 1s",
                    }}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button
                onClick={addTodo}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    color: "#262626",
                    backgroundColor: buttonColor,
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px",
                    transition: "background-color 1s, color 1s",
                }}
            >
                {editIndex !== null ? "Edit Todo" : "Add Todo"}
            </button>
            <ul style={{ width: "100%", listStyleType: "none", padding: 0 }}>
                {todos.map((todo, index) => (
                    <li key={index} style={{ marginBottom: "10px", fontSize: "18px", display: "flex", flexDirection: "column", alignItems: "flex-start", backgroundColor: getBackgroundColor(todo.importance), padding: "10px", borderRadius: "5px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <span style={{color: "#262626"}}>{todo.text}</span>
                            <div>
                                <button
                                    onClick={() => editTodo(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#262626",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        marginRight: "10px",
                                    }}
                                >
                                    ✎
                                </button>
                                <button
                                    onClick={() => deleteTodo(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#262626",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        </div>
                        <div style={{ fontSize: "14px", color: "#888" }}>
                            <span style={{ color: "#262626" }}>Deadline: {todo.deadline}</span>
                        </div>
                        <div style={{ fontSize: "14px", color: "#888" }}>
                            <span style={{ color: "#262626" }}>Importance: {todo.importance}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;