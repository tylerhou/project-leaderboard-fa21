import type { SubmissionWithRank } from "src/InputLeaderboard/Types";

type SortBy = {
  column: "rank" | "name" | "penalty";
  asc: boolean;
};

function sort(
  ranks: SubmissionWithRank[],
  sortBys: SortBy[]
): SubmissionWithRank[] {
  return ranks.sort((a, b) => {
    for (const sortBy of sortBys) {
      let diff: number = 0;
      switch (sortBy.column) {
        case "rank":
          diff = a.rank - b.rank;
          break;
        case "name":
          diff = a.teamName.localeCompare(b.teamName);
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
