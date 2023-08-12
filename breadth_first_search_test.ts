import { assertThrows } from "https://deno.land/std@0.195.0/assert/assert_throws.ts";
import { iterative, recursive } from "./breadth_first_search.ts";
import { Graph } from "./graph.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/testing/asserts.ts";

function breadthFirstSearchTests(
  search: (graph: Graph, start: any, find: any) => any[],
  label: string,
) {
  Deno.test(`[${label}] it throws an error when \`start\` argument is not in the graph`, function () {
    const graph = new Graph();
    const find = "find";
    graph.createNode(find);

    assertThrows(() => search(graph, "start", find));
  });

  Deno.test(`[${label}] it throws an error when \`find\` argument is not in the graph`, function () {
    const graph = new Graph();
    const start = "start";
    graph.createNode(start);

    assertThrows(() => search(graph, start, "find"));
  });

  Deno.test(`[${label}] it returns an array with the \`find\` item when \`start\` and \`find\` are the same`, function () {
    const graph = new Graph();
    graph.createNode("same");
    const path = search(graph, "same", "same");

    assertEquals(path, ["same"]);
  });

  Deno.test(`[${label}] it can find the shortest path between \`start\` and \`find\``, function () {
    const graph = new Graph();

    // graph based on example from the book
    graph.connect({ from: "cab", to: "car" });
    graph.connect({ from: "cab", to: "cat" });
    graph.connect({ from: "cat", to: "mat" });
    graph.connect({ from: "mat", to: "bat" });
    graph.connect({ from: "cat", to: "bat" });
    graph.connect({ from: "car", to: "bar" });
    graph.connect({ from: "bar", to: "bat" });

    const path = search(graph, "cab", "bat");

    // page 104 for illustration
    assertEquals(path, ["cab", "cat", "bat"]);
  });
}

breadthFirstSearchTests(iterative, "iterative");
breadthFirstSearchTests(recursive, "recursive");
