import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { Submission } from "src/InputLeaderboard/Types";

import { InputLeaderboard } from "src/InputLeaderboard/InputLeaderboard";
import { GetInputLeaderboard } from "src/api/GetInputLeaderboard";
import { Size } from "src/Types";

function InputLeaderboardPage(_: {}) {
  const [submissions, setSubmissions] = useState<Submission[] | null>(null);

  const { size: sizeStr, input: inputStr } = useParams();
  let size: Size | undefined = undefined;
  let input: number | undefined = undefined;

  let notFound = false;
  if (sizeStr !== undefined) {
    if (!Object.values(Size).includes(sizeStr as Size)) {
      notFound = true;
    }
    size = sizeStr as Size;
  }

  if (inputStr !== undefined) {
    const re = /^\d\d\d$/;
    if (!inputStr.match(re)) {
      notFound = true;
    }
    input = Number(inputStr);
  }

  useEffect(() => {
    GetInputLeaderboard(size, input).then((r) => setSubmissions(r));
  }, [size, input]);

  if (notFound) {
      return (
        <div className="container">
          <br/>
          <br/>
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
