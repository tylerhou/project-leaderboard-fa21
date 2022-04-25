import React from "react";

import type { SubmissionWithRank } from "src/InputLeaderboard/Types";

type InputLeaderboardRowProps = SubmissionWithRank;

function InputLeaderboardRow(props: InputLeaderboardRowProps) {
  return (
    <tr>
      <th>{props.rank}</th>
      <td>
        <span>{props.teamName}</span>
        {/* <span className="team-link"> */}
        {/* <a href={`/team/${props.teamName}`}>{props.teamName}</a> */}
        {/* </span> */}
      </td>
      <td>{props.penalty}</td>
    </tr>
  );
}

export { InputLeaderboardRow };
