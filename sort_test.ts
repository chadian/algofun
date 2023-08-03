import {
  imperative as imperativeSelectionSort,
  recursive as recursiveSelectionSort,
} from "./selection_sort.ts";
import { recursive as recursiveQuickSort } from './quick_sort.ts';
import { imperative as imperativeQuickSort } from './quick_sort.ts';
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

function selectionSortTests(label: string, sortFunction: any) {
  Deno.test(`[${label}] it sorts an array of numbers`, function () {
    const items = Object.freeze([
      -100,
      0,
      20,
      5,
      -3,
      8000,
      0,
      5,
      1024,
    ]) as number[];
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

    const sortedItems = sortFunction(items);
    assertEquals(sortedItems, expectedSortedItems);
  });

  Deno.test(`[${label}] it handles sorting an empty array`, function () {
    assertEquals(sortFunction([]), []);
  });

  Deno.test(`[${label}] it handles positive and negative infinity`, function () {
    assertEquals(sortFunction([10, -Infinity, -50, Infinity]), [
      -Infinity,
      -50,
      10,
      Infinity,
    ]);
  });

  Deno.test(`[${label}] it handles duplicate items`, function () {
    assertEquals(sortFunction([10, 0, 10, -50]), [-50, 0, 10, 10]);
  });

  Deno.test(`[${label}] sorting doesn't modify the original array of items`, function () {
    const items = Object.freeze([2, -2, 20, 0, -20]) as number[];
    const itemsCopy = [...items];
    sortFunction(items);
    assertEquals(items, itemsCopy);
  });
}

selectionSortTests("recursive selection sort", recursiveSelectionSort);
selectionSortTests("imperative selection sort", imperativeSelectionSort);
selectionSortTests("recursive quick sort", recursiveQuickSort);
selectionSortTests("imperative quick sort", imperativeQuickSort);
