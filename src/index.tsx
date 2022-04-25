import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";

import { InputLeaderboardPage } from "src/InputLeaderboard/InputLeaderboardPage";
import { TeamLeaderboardPage } from "src/TeamLeaderboard/TeamLeaderboardPage";

function Root() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/leaderboard/:size/:input"
          element={<InputLeaderboardPage />}
        />
        <Route path="/leaderboard/:size" element={<InputLeaderboardPage />} />
        <Route path="/team/:team" element={<TeamLeaderboardPage />} />
        <Route path="/" element={<InputLeaderboardPage />} />
      </Routes>
    </HashRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
