// Utility to generate Fibonacci numbers

/**
 * Returns the first `count` numbers of the Fibonacci sequence.
 *
 * @param count number of elements to generate (must be >= 0)
 * @returns array of Fibonacci numbers
 */
export function generateFibonacci(count: number): number[] {
  if (count < 0) {
    throw new Error('count must be non-negative');
  }
  const result: number[] = [];
  for (let i = 0; i < count; i++) {
    if (i < 2) {
      result.push(i);
    } else {
      result.push(result[i - 1] + result[i - 2]);
    }
  }
  return result;
}
