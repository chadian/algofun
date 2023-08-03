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
      const PIVOT_INDEX = 0;
      const pivot = items[PIVOT_INDEX];
      const { before, after } = items.reduce(
        ({ before, after }, item, index) => {
          // avoid including pivot by just returning the existing { before, after }
          // an alternative would be to create a copy of the array
          // and unshift but that seems more intensive than just
          // skipping one function call
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
        { before: [], after: [] } as { before: number[]; after: number[] }
      );

      const beforeSorted = recursive(before);
      const afterSorted = recursive(after);

      return [...beforeSorted, pivot, ...afterSorted];
    }
  }
}
