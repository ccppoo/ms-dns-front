export function* zip<T, K, G>(arr1: T[], arr2: K[]): Generator<[T, K]> {
  // Create an array of tuples
  const len = arr1.length;
  let cnt = 0;
  while (cnt < len) {
    yield [arr1[cnt], arr2[cnt]];
    cnt++;
  }
}

export function* range(start: number, end: number, step?: number) {
  if (step) {
    for (let i = start; i < end; i += step) yield i;
    return;
  }
  for (let i = start; i < end; i++) yield i;
}

export function rangeArray(start: number, stop: number, step?: number) {
  if (step) {
    return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  }
  return Array.from({ length: (stop - start) / 1 }, (_, i) => start + i);
}
