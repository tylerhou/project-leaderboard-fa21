import type { Size, InputID } from "src/Types";

type LeaderboardRank = {
  penalty: number;
  penaltyStr: string;
  rank: number;
  size: Size;
  input: InputID;
};

export { LeaderboardRank };
