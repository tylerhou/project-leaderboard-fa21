import type { Size, InputID } from "src/Types";

type LeaderboardRank = {
  penalty: number;
  rank: number;
  size: Size;
  input: InputID;
};

export { LeaderboardRank };
