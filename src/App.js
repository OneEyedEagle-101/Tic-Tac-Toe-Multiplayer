import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import WaitingRoom from "./Components/WaitingRoom";
import StartingGame from "./Components/StartingGame";
import WinPage from "./Components/WinPage";
import TiePage from "./Components/TiePage";
function App() {
  return (
    <Routes>
      <Route element={<LandingPage />} path="/"></Route>
      <Route element={<WaitingRoom />} path="/waiting-room"></Route>
      <Route element={<StartingGame />} path="/starting-game"></Route>
      <Route element={<WinPage />} path="/win-page"></Route>
      <Route element={<TiePage />} path="/tie-page"></Route>
    </Routes>
  );
}
export default App;
