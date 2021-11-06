export function sum(...args: Array<number>): number {
  return args.reduce((acc, curr) => acc += curr, 0);
}

export function multiply(...args: Array<number>): number {
  return args.reduce((acc, curr) => acc *= curr, 1);
}