import groupBy from "lodash.groupby";

export function countWordOccurrences(phrase: string, word: string): number {
  const words = phrase
    .replace(/[^a-zA-Z ]/g, "") // cleaning the phrase to get accurate count
    .split(" ");

  return words.reduce((acc, curr) =>
    curr.toLowerCase() === word.toLowerCase()
      ? acc += 1
      : acc += 0
    , 0);
}

export function replaceAllVowelsWithX(arg: string): string {
  return arg
    .replace(/[aeiou]/g, "x")
    .replace(/[AEIOU]/g, "X");
}

// using lodash here just to have a dependency that is not --dev
export function countOccurenceOfEveryChar(phrase: string) {
  const charArr = phrase.split("");
  const charGroups = groupBy(charArr, (char) => char);

  return Object
    .entries(charGroups)
    .reduce((acc: any, curr) => {
      acc[curr[0]] = curr[1].length; return acc;
    }, {});
}