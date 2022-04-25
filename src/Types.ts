enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}

function ParseSize(input: string): Size | undefined {
  if (!Object.values(Size).includes(input as Size)) {
    return undefined;
  }
  return input as Size;
}

type InputID = number & { readonly __tag: unique symbol };

const NUM_CASE_DIGITS = 3;

function InputIDToString(id: InputID) {
  return String(id).padStart(NUM_CASE_DIGITS, "0");
}

function ParseInputID(input: string | number): InputID | undefined {
  if (typeof input === "number") {
    return input as InputID;
  }
  const re = /^\d\d\d$/;
  if (!input.match(re)) {
    return undefined;
  }
  return Number(input) as InputID;
}

export { Size, ParseSize, InputID, ParseInputID, InputIDToString };
