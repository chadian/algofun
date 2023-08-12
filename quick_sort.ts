export function recursive(items: number[]): number[] {
  switch (items.length) {
    case 0:
    case 1: {
      return items;
    }

    case 2: {
      const sorted = items[0] > items[1] ? [items[1], items[0]] : items;
      return sorted;
    }

    default: {
      const PIVOT_INDEX = Math.floor(Math.random() * items.length);
      const pivot = items[PIVOT_INDEX];
      const { before, after } = items.reduce(
        ({ before, after }, item, index) => {
          // Skip the pivot
          if (index === PIVOT_INDEX) {
            return { before, after };
          }

          if (item > pivot) {
            after.push(item);
          } else {
            before.push(item);
          }

          return { before, after };
        },
        { before: [], after: [] } as { before: number[]; after: number[] },
      );

      const beforeSorted = recursive(before);
      const afterSorted = recursive(after);

      return [...beforeSorted, pivot, ...afterSorted];
    }
  }
}

// This is bit of a weird implementation but essentialy `toSort`
// is an array, within it are arrays of numbers or numbers.
// It starts by adding the `items` argument as an array to
// to the list of `toSort`. Each iteration finds and unpacks
// an array and replaces it with a deconstruction, either:
// * 0 element array spliced by deleting the array
// * 1 element array spliced with the element itself
// * 2 element array spliced with the correctly sorted two elements
// * > 2 element array spliced with [array of items before pivot], pivot, [array of items after pivot]
// * this continues until no more arrays are found to be
// deconstructed and the loop is broken;
//
// Example:
// [[-20, 20, -100, 10]]
// would become
// => [[-100], -20, [20, 10]] where -20 is the pivot
// => [-100, -20, [20, 10]] where an array ([-100]) with one
// element is replaced with the only item
// => [-100, -20, 10, 20] where a two element array is
// replaced with the two elements sorted
export function imperative(items: number[]): number[] {
  const toSort: (number | number[])[] = [];
  toSort.push(items);

  while (true) {
    let toSortIndex: number | null = null;
    for (let i = 0; i < toSort.length; i++) {
      if (Array.isArray(toSort[i])) {
        toSortIndex = i;
        break;
      }
    }

    // nothing left to sort, break.
    if (toSortIndex === null) {
      break;
    }

    const items = toSort[toSortIndex] as number[];
    if (items.length === 0) {
      toSort.splice(toSortIndex, 1);
      continue;
    }

    if (items.length === 1) {
      toSort[toSortIndex] = items[0];
      continue;
    }

    if (items.length === 2) {
      const sortedItems = items[0] > items[1] ? [items[1], items[0]] : items;
      toSort.splice(toSortIndex, 1, ...sortedItems);
      continue;
    }

    const PIVOT_INDEX = Math.floor(Math.random() * items.length);
    const pivot = items[PIVOT_INDEX];
    const before = [];
    const after = [];
    for (let i = 0; i < items.length; i++) {
      // Skip the pivot
      if (i === PIVOT_INDEX) {
        continue;
      }

      if (items[i] > pivot) {
        after.push(items[i]);
      } else {
        before.push(items[i]);
      }
    }

    toSort.splice(toSortIndex, 1, before, pivot, after);
  }

  return toSort as number[];
}
