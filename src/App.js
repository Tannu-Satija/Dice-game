import { useState } from "react";
import "./App.css";
import Frontpage from "./component/Frontpage";
import Secoundpage from "./component/Secoundpage";
import Dice from "./component/Dice";
function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };
  return (
    <div>
      <>
        {isGameStarted ? (<Secoundpage />) : (<Frontpage toggle={toggleGamePlay} />)}
      </>
      
    </div>
  );
}

export default App;
