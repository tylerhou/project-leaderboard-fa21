import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { Submission } from "src/InputLeaderboard/Types";

import { InputLeaderboard } from "src/InputLeaderboard/InputLeaderboard";
import { FetchInputLeaderboard } from "src/InputLeaderboard/FetchInputLeaderboard";
import { Size, ParseSize, InputID, ParseInputID } from "src/Types";

function InputLeaderboardPage(_: {}) {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);

  const { size: sizeStr, input: inputStr } = useParams();
  let size: Size | undefined = undefined;
  let input: InputID | undefined = undefined;

  let notFound = false;
  if (sizeStr !== undefined) {
    size = ParseSize(sizeStr);
    if (size === undefined) {
      notFound = true;
    }
  }

  if (inputStr !== undefined) {
    input = ParseInputID(inputStr);
    if (input === undefined) {
      notFound = true;
    }
  }

  useEffect(() => {
    FetchInputLeaderboard(size, input).then((r) => setSubmissions(r));
  }, [size, input]);

  if (notFound) {
    return (
      <div className="container">
        <br />
        <br />
        <h1>404 Not Found.</h1>
      </div>
    );
  }

  if (submissions === null) {
    return null;
  }

  return (
    <InputLeaderboard size={size} input={input} submissions={submissions} />
  );
}

export { InputLeaderboardPage };
