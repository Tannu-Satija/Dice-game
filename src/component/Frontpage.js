import React from "react";
import "./Frontpage.css";

const Frontpage = ({ toggle }) => {
  return (
    <div>
      <div className="container">
        <div className="image">
          <img src="dices1.png" alt=" dice" />
        </div>
        <div className="main">
          <div className="dice">DICE GAME</div>
          <button onClick={toggle} className="button">
            Play Now
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Frontpage;
