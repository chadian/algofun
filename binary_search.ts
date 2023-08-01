// Binary search assumes `list` is sorted
// This implementation is limited to searching for numbers. That is because
// numbers are easy to compare in a sorted position, eg:
// * 5 > 2
// * 5 === 5
// * 5 < 10
//
// Binary search requires a sorted list, which means being able to compare
// whether an item can be found on either side of split collections based
// on a comparison against the middle element.
//
// This algorithm could be changed to support a comparison function where
// given two items it would return:
// * item 1 === item 2
// * item 1 > item 2
// * item 1 < item 2
//
// This function would then support binary search on a generic list
export function recursive(
  list: number[],
  item: number,
  low: number | undefined = undefined,
  high: number | undefined = undefined,
): number | void {
  // in the case there is nothing in the list, there's nothing to search
  if (list.length === 0) {
    return;
  }

  low = low ?? 0;
  high = high ?? list.length - 1;
  const mid = low + Math.floor((high - low) / 2);

  if (item === list[mid]) {
    return mid;
  }

  // check if item is within the range of list
  // this assumption works when the list is sorted
  if (item < list[low] || item > list[high]) {
    return;
  }

  const itemInHigherRange = item > list[mid];
  const [newLow, newHigh] = itemInHigherRange
    ? [mid + 1, high]
    : [low, mid - 1];

  return recursive(list, item, newLow, newHigh);
}

export function imperative(list: number[], item: number) {
  let low = 0;
  let high = list.length - 1;
  let mid = -1;

  // should stop when the item is found or when the range has collapsed
  while (list[mid] !== item && high >= low) {
    mid = low + Math.floor((high - low) / 2);

    const itemInHigherRange = item > list[mid];
    const [newLow, newHigh] = itemInHigherRange
      ? [mid + 1, high]
      : [low, mid - 1];

    low = newLow;
    high = newHigh;
  }

  return list[mid] === item ? mid : undefined;
}
