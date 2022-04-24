import type { Size } from "src/Types";
import type { Submission } from "src/InputLeaderboard/Types";

declare interface GetInputLeaderboardResponse {
  Entries: {
    TeamName: string;
    TeamScore: number;
  }[];
}

async function GetInputLeaderboard(
  size?: Size,
  input?: number
): Promise<Submission[]> {
  const params = new URLSearchParams();
  if (size != null) {
    params.append("caseType", size);
  }
  if (input != null) {
    params.append("caseID", String(input));
  }
  const result = await fetch(
    `https://project.cs170.dev/scoreboard?${params.toString()}`
  );
  const parsed: GetInputLeaderboardResponse = await result.json();

  return parsed.Entries.map((item) => ({
    teamName: item.TeamName,
    penalty: item.TeamScore,
  }));
}

export { GetInputLeaderboard };
