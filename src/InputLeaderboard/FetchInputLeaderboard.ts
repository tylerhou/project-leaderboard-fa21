import type { Size, InputID } from "src/Types";
import type { Submission } from "src/InputLeaderboard/Types";

declare interface FetchInputLeaderboardResponse {
  Entries: {
    TeamName: string;
    TeamScore: number;
  }[];
}

async function FetchInputLeaderboard(
  size?: Size,
  input?: InputID
): Promise<Submission[]> {
  const url: string[] = [];
  if (size != null) {
    url.push(size);
    url.push("/");

    if (input != null) {
      url.push(String(input).padStart(3, "0"));
      url.push("/");
    }
  }
  const result = await fetch(
    `https://project.cs170.dev/scoreboard/${url.join("")}`
  );
  const parsed: FetchInputLeaderboardResponse = await result.json();

  return parsed.Entries.map((item) => ({
    teamName: item.TeamName,
    penalty: item.TeamScore,
  }));
}

export { FetchInputLeaderboard };
