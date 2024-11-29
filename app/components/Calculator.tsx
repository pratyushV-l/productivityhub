import React, { useState, useEffect } from "react";
import * as math from "mathjs";

const Calculator: React.FC<{ onClose: () => void }> = ({}) => {
  const [input, setInput] = useState<string>("");

  const handleButtonClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input.replace(/pi/g, "Math.PI").replace(/e/g, "Math.E"));
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleFunction = (func: string) => {
    setInput((prev) => prev + func + "(");
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (!isNaN(Number(key))) {
      handleButtonClick(key);
    } else {
      switch (key) {
        case '+':
          handleButtonClick('+');
          break;
        case '-':
          handleButtonClick('-');
          break;
        case '*':
          handleButtonClick('*');
          break;
        case '/':
          handleButtonClick('/');
          break;
        case 'Enter':
          handleCalculate();
          break;
        case 'Backspace':
          handleDelete();
          break;
        case 'c':
        case 'C':
          handleClear();
          break;
        case 's':
        case 'S':
          handleFunction('sin');
          break;
        case 'o':
        case 'O':
          handleFunction('cos');
          break;
        case 't':
        case 'T':
          handleFunction('tan');
          break;
        case 'l':
        case 'L':
          handleFunction('log');
          break;
        case 'n':
        case 'N':
          handleFunction('ln');
          break;
        case 'r':
        case 'R':
          handleFunction('sqrt');
          break;
        case 'p':
        case 'P':
          handleFunction('pi');
          break;
        case 'e':
        case 'E':
          handleButtonClick('e');
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  return (
    <>
      <div style={styles.display}>{input || "0"}</div>
      <div style={styles.buttonGrid}>
        {/* Row 1 */}
        <button style={styles.button} onClick={() => handleFunction("sin")}>
          sin
        </button>
        <button style={styles.button} onClick={() => handleFunction("cos")}>
          cos
        </button>
        <button style={styles.button} onClick={() => handleFunction("tan")}>
          tan
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("(")}>
          (
        </button>
        <button style={styles.button} onClick={() => handleButtonClick(")")}>
          )
        </button>
        {/* Row 2 */}
        <button style={styles.button} onClick={() => handleFunction("log")}>
          log
        </button>
        <button style={styles.button} onClick={() => handleFunction("ln")}>
          ln
        </button>
        <button style={styles.button} onClick={() => handleFunction("sqrt")}>
          √
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("^")}>
          ^
        </button>
        <button style={styles.button} onClick={handleDelete}>
          Del
        </button>
        {/* Row 3 */}
        <button style={styles.button} onClick={() => handleButtonClick("7")}>
          7
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("8")}>
          8
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("9")}>
          9
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("/")}>
          ÷
        </button>
        <button style={styles.button} onClick={handleClear}>
          C
        </button>
        {/* Row 4 */}
        <button style={styles.button} onClick={() => handleButtonClick("4")}>
          4
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("5")}>
          5
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("6")}>
          6
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("*")}>
          ×
        </button>
        <button style={styles.button} onClick={() => handleFunction("pi")}>
          π
        </button>
        {/* Row 5 */}
        <button style={styles.button} onClick={() => handleButtonClick("1")}>
          1
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("2")}>
          2
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("3")}>
          3
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("-")}>
          -
        </button>
        <button style={styles.button} onClick={() => handleFunction("e")}>
          e
        </button>
        {/* Row 6 */}
        <button style={styles.button} onClick={() => handleButtonClick("0")}>
          0
        </button>
        <button style={styles.button} onClick={() => handleButtonClick(".")}>
          .
        </button>
        <button style={styles.button} onClick={handleCalculate}>
          =
        </button>
        <button style={styles.button} onClick={() => handleButtonClick("+")}>
          +
        </button>
        <button style={styles.button} onClick={() => handleFunction("abs")}>
          |x|
        </button>
      </div>
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  display: {
    backgroundColor: "#262626",
    color: "#fff",
    padding: "15px",
    borderRadius: "5px",
    textAlign: "right",
    fontSize: "24px",
    marginBottom: "10px",
    minHeight: "50px",
    wordWrap: "break-word",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  button: {
    padding: "15px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#262626",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Calculator;