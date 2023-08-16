import { DijkstrasEdgeMeta, dijkstras } from "./dijkstras_search.ts";
import { Graph } from "./graph.ts";
import { assertEquals } from "https://deno.land/std@0.195.0/assert/assert_equals.ts";

// based on page 127 in book
Deno.test('it can find the shortest path based on Graph weights', function() {
  const graph = new Graph<any, DijkstrasEdgeMeta>();

  const label = {
    BOOK: 'BOOK',
    LP: 'LP',
    POSTER: 'POSTER',
    GUITAR: 'GUITAR',
    DRUMS: 'DRUMS',
    PIANO: 'PIANO',
  };

  graph.connect({ from: label.BOOK, to: label.LP, meta: { weight: 5 }});
  graph.connect({ from: label.LP, to: label.GUITAR, meta: { weight: 15 }});
  graph.connect({ from: label.LP, to: label.DRUMS, meta: { weight: 20 }});
  graph.connect({ from: label.BOOK, to: label.POSTER, meta: { weight: 0 }});
  graph.connect({ from: label.POSTER, to: label.GUITAR, meta: { weight: 30 }});
  graph.connect({ from: label.GUITAR, to: label.PIANO, meta: { weight: 20 }});
  graph.connect({ from: label.POSTER, to: label.DRUMS, meta: { weight: 35 }});
  graph.connect({ from: label.DRUMS, to: label.PIANO, meta: { weight: 10 }});

  const path = dijkstras(graph, label.BOOK, label.PIANO);

  // page 127 for illustration of expectation
  assertEquals(path, [ "BOOK", "LP", "DRUMS", "PIANO" ]);
});
