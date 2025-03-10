import { useWindowSize } from "usehooks-ts";

export function useTextTruncate({
  baseLength,
  baseWindowWidth,
  windowWidthIncrement,
  lengthIncrement,
}: {
  baseLength?: number;
  // the shortest the string can be
  baseWindowWidth?: number;
  // the narrowest the screen can be
  windowWidthIncrement?: number;
  // increments of screen width by which to increment string cutoff
  lengthIncrement?: number;
  // increment of string cutoff
}) {
  const { width = 0 } = useWindowSize();

  const truncate = (string: string) => {
    const allowedCharLength =
      (baseLength ?? 12) +
      Math.floor(
        (width - (baseWindowWidth ?? 250)) / (windowWidthIncrement ?? 50)
      ) *
        (lengthIncrement ?? 4);
    if (string.length < allowedCharLength) return string;
    return string.slice(0, allowedCharLength).concat("...");
  };

  return { truncate };
}
