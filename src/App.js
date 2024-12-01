import "./App.css";
import DataProcessor from "./DataProcessor";
import { useState } from "react";

function App() {
  const [userText, setUserText] = useState("");

  const handleUserTextChange = (e) => {
    setUserText(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={userText} onChange={handleUserTextChange} />

      <DataProcessor userText={userText} />
    </div>
  );
}

export default App;
