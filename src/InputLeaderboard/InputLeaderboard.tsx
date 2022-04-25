import React, { useState } from "react";

import type {
  Submission,
  SubmissionWithRank,
} from "src/InputLeaderboard/Types";

import { InputLeaderboardRow } from "src/InputLeaderboard/InputLeaderboardRow";
import { Size, InputID, InputIDToString } from "src/Types";

import { sort, SortBy } from "src/InputLeaderboard/Sort";

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

// TODO(tylerhou): Reduce duplication with TeamLeaderboard.tsx.
function reduceSortBys(sortBys: SortBy[], column: SortBy["column"]): SortBy[] {
  const nextSortBys: SortBy[] = [];
  let start: SortBy | undefined;
  for (const sortBy of sortBys) {
    if (sortBy.column === column) {
      start = { column: column, asc: !sortBy.asc };
    } else {
      nextSortBys.push(sortBy);
    }
  }

  if (start === undefined) {
    start = { column: column, asc: true };
  }
  nextSortBys.unshift(start);
  return nextSortBys;
}

function sortIndicator(sortBys: SortBy[], column: SortBy["column"]): string {
  for (const sortBy of sortBys) {
    if (sortBy.column == column) {
      return sortBy.asc ? " ▲" : " ▼";
    }
  }
  return "";
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

  const [sortBys, setSortBys] = useState<SortBy[]>([
    { column: "rank", asc: true },
  ]);

  const withRanks = sort(computeRanks(props.submissions), sortBys);

  const inner =
    withRanks.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "rank"))
              }
            >
              #{sortIndicator(sortBys, "rank")}
            </th>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "name"))
              }
            >
              Team Name{sortIndicator(sortBys, "name")}
            </th>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "penalty"))
              }
            >
              {scoreType}
              {sortIndicator(sortBys, "penalty")}
            </th>
          </tr>
        </thead>
        <tbody>
          {withRanks.map((s) => {
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
    ) : (
      <h4>No data found.</h4>
    );

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
        {inner}
      </div>
    </div>
  );
}

export { InputLeaderboard };
