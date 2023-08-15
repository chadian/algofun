import { Graph } from "./graph.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

Deno.test("it always return the same node for the same value", function () {
  const graph = new Graph();
  const node1 = graph.createNode(1);
  const node2 = graph.createNode(1);
  assertEquals(node1, node2);
});

Deno.test("it can connect two nodes", function () {
  const graph = new Graph();
  graph.connect({ from: 1, to: 2 });
  assertEquals(graph.nodeForValue(1), {
    value: 1,
    edges: [{ node: graph.nodeForValue(2)!, meta: {} }],
  });
});

Deno.test("it can lookup a node by value", function () {
  const graph = new Graph();
  const node = graph.createNode(1);
  assertEquals(graph.nodeForValue(1), node);
});

Deno.test("it create nodes with values by object reference", function () {
  const graph = new Graph();
  const object = {};
  graph.createNode(object);
  assertEquals(graph.nodeForValue(object)!.value, object);
});

Deno.test("it returns undefined when a node cannot be found for a value", function () {
  const graph = new Graph();
  assertEquals(graph.nodeForValue({}), undefined);
});
