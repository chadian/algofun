const NOT_FOUND_INDEX = -1;

export function recursive(array: number[], sorted: number[] = []): number[] {
  if (array.length === 0) {
    return sorted;
  }

  const lowestIndex = findLowestIndexRecursive(array);
  if (lowestIndex === NOT_FOUND_INDEX) {
    return sorted;
  }

  sorted.push(array[lowestIndex]);

  // filter is slower but opting for a more functional approach
  // with the `recursive` approach
  array = array.filter((_, i) => i !== lowestIndex);

  return recursive(array, sorted);
}

function findLowestIndexRecursive(
  array: number[],
  current = 0,
  lowest = NOT_FOUND_INDEX,
): number {
  if (current > array.length - 1) {
    return lowest ?? NOT_FOUND_INDEX;
  }

  const item = array[current];
  const next = current + 1;

  const currentItemIsLower = lowest === NOT_FOUND_INDEX || item < array[lowest];

  if (currentItemIsLower) {
    lowest = current;
    return findLowestIndexRecursive(array, next, lowest);
  }

  return findLowestIndexRecursive(array, next, lowest);
}

export function imperative(array: number[]): number[] {
  // make copy so that it can be modified at will
  array = [...array];
  const sorted: number[] = [];
  const itemsToSort = array.length;

  while (sorted.length < itemsToSort) {
    let lowest = null;

    for (let i = 0; i < array.length; i++) {
      if (lowest === null || array[i] < array[lowest]) {
        lowest = i;
      }
    }

    if (lowest !== null) {
      sorted.push(array[lowest]);
      array.splice(lowest, 1);
    }
  }

  return sorted;
}
