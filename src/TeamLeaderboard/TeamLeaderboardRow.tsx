import React from "react";
import { Link } from "react-router-dom";

import { InputIDToString } from "src/Types";

import type { LeaderboardRank } from "src/TeamLeaderboard/Types";

type TeamLeaderboardRowProps = LeaderboardRank;

function TeamLeaderboardRow(props: TeamLeaderboardRowProps) {
  return (
    <tr>
      <td>
        <span className="leaderboard-link">
          <Link
            to={`/leaderboard/${props.size}/${InputIDToString(props.input)}`}
          >
            {props.size}/{InputIDToString(props.input)}
          </Link>
        </span>
      </td>
      <td>{props.rank}</td>
      <td>{props.penalty}</td>
    </tr>
  );
}

export { TeamLeaderboardRow };
