import { EMPTY_ITEM, Queue } from "./queue.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

Deno.test("it can queue and dequeue an item", function () {
  const q = new Queue();
  q.enqueue(20);
  assertEquals(q.length, 1);
  const result = q.dequeue();
  assertEquals(result, 20);
});

Deno.test("it can mix queue and dequeue", function () {
  const q = new Queue();
  q.enqueue(20);
  assertEquals(q.length, 1);

  q.enqueue(40);
  assertEquals(q.length, 2);

  assertEquals(q.dequeue(), 20);
  assertEquals(q.length, 1);

  q.enqueue(30);
  assertEquals(q.length, 2);

  assertEquals(q.dequeue(), 40);
  assertEquals(q.length, 1);

  assertEquals(q.dequeue(), 30);
  assertEquals(q.length, 0);
});

Deno.test("it returns the EMPTY_ITEM symbol when there is nothing in the queue", function () {
  const q = new Queue();
  assertEquals(q.length, 0);
  // initially empty
  assertEquals(q.dequeue(), EMPTY_ITEM);

  q.enqueue("HELLO");
  assertEquals(q.length, 1);
  assertEquals(q.dequeue(), "HELLO");
  // empty after exhausting queue via `dequeue`
  assertEquals(q.dequeue(), EMPTY_ITEM);
});
