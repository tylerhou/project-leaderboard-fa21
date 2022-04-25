import React from "react";

import type {
  Submission,
  SubmissionWithRank,
} from "src/InputLeaderboard/Types";

import { InputLeaderboardRow } from "src/InputLeaderboard/InputLeaderboardRow";
import { Size, InputID, InputIDToString } from "src/Types";

// TODO(tylerhou): Tests.
function computeRanks(submissions: Submission[]): SubmissionWithRank[] {
  submissions.sort((a, b) => {
    const penaltyDiff = a.penalty - b.penalty;
    if (penaltyDiff != 0) {
      return penaltyDiff;
    }
    return a.teamName.localeCompare(b.teamName);
  });

  let results: SubmissionWithRank[] = [];
  for (let i = 0; i < submissions.length; ) {
    const highest = submissions[i]!;
    let j = i + 1;
    for (; j < submissions.length; ++j) {
      const current = submissions[j]!;
      if (highest.penalty != current.penalty) {
        break;
      }
    }

    // Submissions [i, j) have the same rank.
    for (let k = i; k < j; ++k) {
      results.push({
        ...submissions[k]!,
        rank: i,
      });
    }
    i = j;
  }

  return results;
}

type InputLeaderboardProps = {
  size: Size | undefined;
  input: InputID | undefined;
  submissions: Submission[];
};

function InputLeaderboard(props: InputLeaderboardProps) {
  const scoreType =
    props.size === undefined || props.input === undefined
      ? "Average Rank"
      : "Penalty";
  return (
    <div className="container">
      <h1 id="table-title" className="title pt-4">
        <code>
          {props.size ?? "*"}/
          {props.input === undefined ? "*" : InputIDToString(props.input)}
        </code>
      </h1>
      <br />
      <div className="container" id="table">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Team Name</th>
              <th>{scoreType}</th>
            </tr>
          </thead>
          <tbody>
            {computeRanks(props.submissions).map((s) => {
              return (
                <InputLeaderboardRow
                  teamName={s.teamName}
                  penalty={s.penalty}
                  rank={s.rank}
                  key={s.teamName}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { InputLeaderboard };
