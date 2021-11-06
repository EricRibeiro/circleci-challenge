import { expect } from "chai";
import { multiply, sum } from "./math";

describe("Checking if the math library does its thing", () => {
  it("should return a valid number from a sum operation with two arguments", () => {
    const val: number = sum(256, 128);
    expect(val).to.equal(384);
  });

  it("should return a valid number from a sum operation with more than two arguments", () => {
    const val: number = sum(256, 128, 64);
    expect(val).to.equal(448);
  });

  it("should return a valid number from a multiply operation with two arguments", () => {
    const val: number = multiply(256, 128);
    expect(val).to.equal(32768);
  });

  it("should return a valid number from a multiply operation with more than two arguments", () => {
    const val: number = multiply(256, 128, 64);
    expect(val).to.equal(2097152);
  });

  it("should return a valid number from a multiply operation with more than four arguments", () => {
    const val: number = multiply(256, 128, 64, 32, 16);
    expect(val).to.equal(1073741824);
  });
});