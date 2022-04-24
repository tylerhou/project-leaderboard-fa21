import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, HashRouter } from "react-router-dom";

import { InputLeaderboardPage } from "src/InputLeaderboard/InputLeaderboardPage";

function Root() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:size/:input" element={<InputLeaderboardPage />} />
        <Route path="/:size" element={<InputLeaderboardPage />} />
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
