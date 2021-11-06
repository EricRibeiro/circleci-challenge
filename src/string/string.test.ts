import { expect } from "chai";
import { countOccurenceOfEveryChar, countWordOccurrences, replaceAllVowelsWithX } from "./string";

describe("Checking if the string library does its thing", () => {
  it("should return how often a word occurs in a phrase", () => {
    const phrase = "You cannot end a sentence with because because because is a conjunction."
    const count = countWordOccurrences(phrase, "because");
    expect(count).to.equal(3);
  });

  it("should return how often a word occurs in a phrase even if it's accompanied by a punctuation mark", () => {
    const phrase = "Hello there! My name is Eric, Not Erik or Herick, but Eric."
    const count = countWordOccurrences(phrase, "Eric");
    expect(count).to.equal(2);
  });

  it("should return how often each character occurs in a phrase", () => {
    const phrase = "Hello there!"
    const count = countOccurenceOfEveryChar(phrase);
    const expectation = {
      "H": 1,
      "e": 3,
      "l": 2,
      "o": 1,
      "t": 1,
      "h": 1,
      "r": 1,
      "!": 1,
      " ": 1
    }

    expect(count).to.deep.equal(expectation);
  });

  it("should return a string with all vowels replaced with 'x'", () => {
    const phrase = "You see, I'm ok with Elden Ring being delayed. I would not be ok with it being broken at launch."
    const phraseWithoutVowels = replaceAllVowelsWithX(phrase);
    expect(phraseWithoutVowels).to.equal("Yxx sxx, X'm xk wxth Xldxn Rxng bxxng dxlxyxd. X wxxld nxt bx xk wxth xt bxxng brxkxn xt lxxnch.");
  });
});