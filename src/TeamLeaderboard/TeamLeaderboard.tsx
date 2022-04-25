import React, { useState } from "react";

import type { LeaderboardRank } from "src/TeamLeaderboard/Types";

import { TeamLeaderboardRow } from "src/TeamLeaderboard/TeamLeaderboardRow";
import { InputIDToString } from "src/Types";

import { SortBy, sort } from "src/TeamLeaderboard/Sort";

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

type TeamLeaderboardProps = {
  team: string;
  ranks: LeaderboardRank[];
};

function TeamLeaderboard(props: TeamLeaderboardProps) {
  const [sortBys, setSortBys] = useState<SortBy[]>([
    { column: "input", asc: true },
  ]);
  const ranks = sort([...props.ranks], sortBys);

  const inner =
    ranks.length > 0 ? (
      <table className="table">
        <thead>
          <tr>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "input"))
              }
            >
              Input{sortIndicator(sortBys, "input")}
            </th>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "rank"))
              }
            >
              Rank{sortIndicator(sortBys, "rank")}
            </th>
            <th
              className="sortable"
              tabIndex={0}
              onClick={() =>
                setSortBys((sortBys) => reduceSortBys(sortBys, "penalty"))
              }
            >
              Penalty{sortIndicator(sortBys, "penalty")}
            </th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((s) => {
            return (
              <TeamLeaderboardRow
                penalty={s.penalty}
                rank={s.rank}
                size={s.size}
                input={s.input}
                key={`${s.size}/${InputIDToString(s.input)}`}
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
        Team&nbsp;&nbsp;
        <code>{props.team}</code>
      </h1>
      <br />
      <div className="container" id="table">
        {inner}
      </div>
    </div>
  );
}

export { TeamLeaderboard };
