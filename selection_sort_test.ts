import { recursive as recursiveSelectionSort } from "./selection_sort.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

Deno.test(`it sorts an array of numbers`, function () {
  const items = Object.freeze([-100, 0, 20, 5, -3, 0, 5, 1024, 8000]) as number[];
  const expectedSortedItems = Object.freeze([
    -100,
    -3,
    0,
    0,
    5,
    5,
    20,
    1024,
    8000,
  ]);

  const sortedItems = recursiveSelectionSort(items);
  assertEquals(sortedItems, expectedSortedItems);
});

Deno.test(`it handles sorting an empty array`, function() {
  assertEquals(recursiveSelectionSort([]), []);
});

Deno.test(`it handles positive and negative infinity`, function() {
  assertEquals(recursiveSelectionSort([10, -Infinity, -50, Infinity]), [-Infinity, -50, 10, Infinity]);
});

Deno.test(`it handles duplicate items`, function() {
  assertEquals(recursiveSelectionSort([10, 0, 10, -50]), [-50, 0, 10, 10]);
});

Deno.test(`sorting doesn't modify the original array of items`, function () {
  const items = Object.freeze([2, -2, 20, 0, -20]) as number[];
  const itemsCopy = [...items];
  recursiveSelectionSort(items);
  assertEquals(items, itemsCopy);
});
