import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Table from "./components/Table";
import Workflow from "./components/Workflow";

function App() {
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  return (
    <div className="App">
      {step === 0 ? (
        <Table setStep={setStep} setSelectedId={setSelectedId} />
      ) : (
        <Workflow setStep={setStep} selectedId={selectedId} />
      )}
    </div>
  );
}

export default App;
