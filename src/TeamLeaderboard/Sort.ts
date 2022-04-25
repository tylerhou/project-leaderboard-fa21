import { Size } from "src/Types";
import type { LeaderboardRank } from "src/TeamLeaderboard/Types";

type SortBy = {
  column: "input" | "rank" | "penalty";
  asc: boolean;
};

function sizeToIndex(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 0;
    case Size.MEDIUM:
      return 1;
    case Size.LARGE:
      return 2;
  }
}

function sort(ranks: LeaderboardRank[], sortBys: SortBy[]): LeaderboardRank[] {
  return ranks.sort((a, b) => {
    for (const sortBy of sortBys) {
      let diff: number = 0;
      switch (sortBy.column) {
        case "input":
          const aSize = sizeToIndex(a.size);
          const bSize = sizeToIndex(b.size);
          if (aSize !== bSize) {
            diff = aSize - bSize;
          } else {
            diff = a.input - b.input;
          }
          break;
        case "rank":
          diff = a.rank - b.rank;
          break;
        case "penalty":
          diff = a.penalty - b.penalty;
          break;
      }

      if (!sortBy.asc) {
        diff *= -1;
      }
      if (diff !== 0) {
        return diff;
      }
    }
    return 0;
  });
}

export { SortBy, sort };
