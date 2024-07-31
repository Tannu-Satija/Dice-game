import React, { useEffect, useRef, useState } from "react";
import "./Secoundpage.css";
import styled from "styled-components";
import Dice from "./Dice";
import State from "./State";
const Secoundpage = () => {
  const arrNumber = [1, 2, 3, 4, 5, 6];
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState();
  const [currentDice, setCurrentDice] = useState(1);
  const [error, setError] = useState("");
  const [showRules, setShowRules] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  let dialogRef = useRef();

  const manageOutsideClick = (event) => {
    if (dialogRef.current && dialogRef.current.contains(event.target)) {
      togglePopup();
    } else {
      console.log("wrong");
    }
  };

  useEffect(() => {
    document.addEventListener("click", manageOutsideClick);
    return () => {
      document.removeEventListener("click", manageOutsideClick);
    };
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  const resetScore = () => {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      setHighScore(score);
    }

    setScore(0);
  };

  const numbeSelectorHandler = (value) => {
    setSelectedNumber(value);
    setError("");
  };

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const roleDice = () => {
    if (!selectedNumber) {
      setError("You have not selected any number");
      return;
    }
    const randomNumber = generateRandomNumber(1, 7);
    setCurrentDice((prev) => randomNumber);
    if (selectedNumber === randomNumber) {
      setScore((prev) => prev + randomNumber);
    } else {
      setScore((prev) => prev);
    }
    setSelectedNumber(undefined);
  };

  return (
    <main className="two">
      <div className="imp">
        <div className="header">
          <pre>
            <p>Total Score </p>
            <h2 className="time">{score}</h2>
          </pre>
          <pre>
            <p>High Score</p>
            <h2>{highScore}</h2>
          </pre>
        </div>
        <div className="both">
          <p className="error">{error}</p>
          <div className="flex">
            {arrNumber.map((value, i) => (
              <Box
                isSelected={value === selectedNumber}
                key={i}
                onClick={() => numbeSelectorHandler(value)}
              >
                {value}
              </Box>
            ))}
          </div>
          <p
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            error={error}
            setError={setError}
          >
            Select Number
          </p>
        </div>
      </div>

      <div>
        <Dice currentDice={currentDice} roleDice={roleDice} />
      </div>
      <div className="one">
        <button
          className="btn-1"
          onClick={() => {
            resetScore();
          }}
        >
          Reset Score
        </button>

        <button
          className="btn-2"
          onClick={() => {
            setShowRules();
            togglePopup();
          }}
        >
          Show Rules
        </button>
      </div>

      {showPopup && (
        <>
          <div ref={dialogRef} className="Popup">
            <div className="me">
              <h2>How to play dice game</h2>
              <div className="para">
                <p>Select any number</p>
                <p>Click on dice image</p>
                <p>
                  after click on dice if selected number is equal to dice number
                  you will get same point as dice{" "}
                </p>
                <p>if you get wrong guess then 2 point will be dedcuted </p>
              </div>
              <button className="th" onClick={togglePopup}>
                <img className="cross" src="cross.png" alt="No image" />
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Secoundpage;

const Box = styled.div`
  background-color: ${(props) => (props.isSelected ? "black" : "white")};
  color: ${(props) => (!props.isSelected ? "black" : "white")};
  height: 72px;
  width: 72px;
  border: 1px solid black;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
`;
