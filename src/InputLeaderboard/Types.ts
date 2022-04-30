type Submission = {
  teamName: string;
  penalty: number;
  penaltyStr: string;
};

type SubmissionWithRank = Submission & { rank: number };

export { Submission, SubmissionWithRank };
