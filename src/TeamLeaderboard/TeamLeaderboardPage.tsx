import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { LeaderboardRank } from "src/TeamLeaderboard/Types";

import { TeamLeaderboard } from "src/TeamLeaderboard/TeamLeaderboard";
import { FetchTeamLeaderboard } from "src/TeamLeaderboard/FetchTeamLeaderboard";

function TeamLeaderboardPage(_: {}) {
  const [ranks, setRanks] = useState<LeaderboardRank[] | null>(null);

  let notFound = false;

  const { team } = useParams();
  if (team === undefined) {
    notFound = true;
  }

  useEffect(() => {
    if (!notFound) {
      FetchTeamLeaderboard(team!).then((r) => setRanks(r));
    }
  }, [team]);

  if (notFound) {
    return (
      <div className="container">
        <br />
        <br />
        <h1>404 Not Found.</h1>
      </div>
    );
  }

  if (ranks === null) {
    return null;
  }

  return <TeamLeaderboard team={team!} ranks={ranks} />;
}

export { TeamLeaderboardPage };
