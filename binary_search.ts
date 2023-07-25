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
export function recursive(
  list: number[],
  item: number,
  offset = 0,
): number | void {
  // in the case there is nothing in the list, there's nothing to search;
  if (list.length === 0) {
    return;
  }

  const low = 0;
  const high = list.length - 1;
  const mid = Math.floor((high - low) / 2);
  const elementAtMid = list[mid];

  console.log({ low, high, mid, elementAtMid, offset });

  const foundMatch = elementAtMid === item;
  if (foundMatch) {
    return offset + mid;
  }

  // choose remaining upper or lower slice based on how the item compares to the element in the middle
  // this is where the assumption that the list is sorted comes into play
  let remainingListToSearch;
  let newOffset;

  if (item > elementAtMid) {
    const newLow = mid + 1;
    const newHigh = high + 1;
    newOffset = offset + newLow;

    remainingListToSearch = list.slice(newLow, newHigh);
  } else {
    const newLow = low;
    const newHigh = mid;
    newOffset = offset + newLow;

    remainingListToSearch = list.slice(newLow, newHigh);
  }

  // recursive check with the remaining slice for the item
  return recursive(remainingListToSearch, item, newOffset);
}
