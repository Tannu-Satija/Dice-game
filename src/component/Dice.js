import "./Dice.css";
const Dice = ({ roleDice, currentDice }) => {
 
  return (
    <div className="dice">
      <img
        className="image"
        onClick={roleDice}
        src={`/diceimages/dice_${currentDice}.png`}
        alt="dice 1"
      />
      <p>Click on Dice to Play</p>
    </div>
  );
};

export default Dice;
