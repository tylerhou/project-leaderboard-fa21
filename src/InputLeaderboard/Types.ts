type Submission = {
  teamName: string;
  penalty: number;
};

type SubmissionWithRank = Submission & { rank: number };

export { Submission, SubmissionWithRank };
