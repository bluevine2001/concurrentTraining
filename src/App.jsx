import ProchainEtrainement from "./components/ProchainEntrainement";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SessionPopup from "./components/SessionPopup";
import ExerciceMaxi from "./components/ExerciceMaxi";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProchainEtrainement userId={"1"} />} />
        <Route path="/session/:sessionId" element={<SessionPopup />} />
        <Route path="/exercice/:exerciceId" element={<ExerciceMaxi />} />
      </Routes>
    </div>
  );
}

export default App;
