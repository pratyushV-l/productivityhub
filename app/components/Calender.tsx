import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const headerStyle = {
    textAlign: "center" as const,
    marginBottom: "20px",
    color: "#fff",
  };

  const calendarStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "5px",
    color: "#fff",
  };

  const dayStyle = {
    padding: "10px",
    textAlign: "center" as const,
    backgroundColor: "#1E1E1E",
    borderRadius: "5px",
  };

  const todayStyle = {
    ...dayStyle,
    backgroundColor: "#FFD392",
    color: "#262626",
  };

  const navigateMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const renderHeader = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={() => navigateMonth(-1)}
          style={{
            padding: "10px",
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {"<"}
        </button>
        <h2 style={headerStyle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          style={{
            padding: "10px",
            backgroundColor: "#1E1E1E",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {">"}
        </button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek.map((day) => (
      <div key={day} style={{ ...dayStyle, fontWeight: "bold" }}>
        {day}
      </div>
    ));
  };

  const renderDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    const monthLength = new Date(year, month + 1, 0).getDate();

    const dates = [];

    for (let i = 0; i < startingDay; i++) {
      dates.push(<div key={`blank-${i}`} style={dayStyle}></div>);
    }

    for (let day = 1; day <= monthLength; day++) {
      const isToday =
        day === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      dates.push(
        <div key={day} style={isToday ? todayStyle : dayStyle}>
          {day}
        </div>
      );
    }

    return dates;
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      {renderHeader()}
      <div style={calendarStyle}>
        {renderDaysOfWeek()}
        {renderDates()}
      </div>
    </div>
  );
};

export default Calendar;