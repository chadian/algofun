import { recursive as recursiveBinarySearch } from "./binary_search.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

Deno.test("it finds an item in an odd-numbered lengthed list", function () {
  const list = [0, 1, 2, 3, 4];
  const expectedIndex = 2;
  const itemToFind = list[expectedIndex];

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, expectedIndex);
});

Deno.test("it finds an item in an even-numbered lengthed list", function () {
  const list = [0, 1, 2, 3];
  const expectedIndex = 2;
  const itemToFind = list[expectedIndex];

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, expectedIndex);
});

Deno.test("it returns undefined when an item cannot be found because it outside the upper bounds", function () {
  const list = [0, 1, 2, 3];
  const itemToFind = 9000;

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, undefined);
});

Deno.test("it returns undefined when an item cannot be found because it outside the lower bounds", function () {
  const list = [0, 1, 2, 3];
  const itemToFind = 9000;

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, undefined);
});

Deno.test("it returns undefined when an item cannot be found within bounds", function () {
  const list = [0, 1, 2, 4, 5];
  const itemToFind = 3;

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, undefined);
});

Deno.test("it returns undefined when a list is empty", function () {
  const list: number[] = [];
  const itemToFind = 9000;

  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, undefined);
});

Deno.test("it can find an item in a very large list", function() {
  const list = new Array(100000).fill(undefined).map((_, i) => i);
  const expectedIndex = 9000;
  const itemToFind = list[expectedIndex];
  
  const foundAtIndex = recursiveBinarySearch(list, itemToFind);
  assertEquals(foundAtIndex, expectedIndex);
});
