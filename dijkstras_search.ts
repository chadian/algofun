import { Graph, Node } from "./graph.ts";

export type DijkstrasEdgeMeta = {
  weight: number;
};

export type DijkstrasNode = Node<any, DijkstrasEdgeMeta>;

export function dijkstras(
  graph: Graph<any, DijkstrasEdgeMeta>,
  start: any,
  find: any
): any[] {
  const startNode = graph.nodeForValue(start) as DijkstrasNode;
  const findNode = graph.nodeForValue(find) as DijkstrasNode;

  if (!startNode) {
    throw new Error("`start` does not exist in graph");
  }

  if (!findNode) {
    throw new Error("`find` does not exist in graph");
  }

  if (startNode === findNode) {
    return [startNode.value];
  }

  const traverseMap = new Map<
    DijkstrasNode,
    { total: number; parent: null | DijkstrasNode }
  >();
  const visited = new Set<DijkstrasNode>();
  const toVisit = new Map<DijkstrasNode, number>();
  traverseMap.set(startNode, { total: 0, parent: null });

  let currentNode = startNode;

  while (currentNode) {
    visited.add(currentNode);
    toVisit.delete(currentNode);

    if (currentNode === findNode) {
      break;
    }

    const { edges } = currentNode;
    const { total } = traverseMap.get(currentNode)!;

    edges.forEach(({ node: edgeNode, meta }) => {
      const { weight } = meta;
      const edgeNodeTotalWeight = total + weight;
      const previousEdgeNodeTotalWeight =
        traverseMap.get(edgeNode)?.total ?? Infinity;

      if (edgeNodeTotalWeight < previousEdgeNodeTotalWeight) {
        traverseMap.set(edgeNode, {
          total: edgeNodeTotalWeight,
          parent: currentNode,
        });
      }

      if (!visited.has(edgeNode)) {
        const lowestSeenWeight = toVisit.get(edgeNode)! ?? Infinity;
        if (weight < lowestSeenWeight) {
          toVisit.set(edgeNode, weight);
        }
      }
    });

    const lowest = [...toVisit.entries()].reduce(
      (previous: any, current: any) => {
        if (current.at(1)! < (previous ? previous.at(1)! : Infinity)) {
          return current;
        }

        return previous;
      },
      null
    );

    currentNode = lowest?.at(0) ?? lowest;
  }

  return extractPathFromTraverseMap(findNode, traverseMap);
}

function extractPathFromTraverseMap(
  find: DijkstrasNode,
  traverseMap: Map<
    DijkstrasNode,
    { total: number; parent: null | DijkstrasNode }
  >
): any[] {
  let currentNode: null | DijkstrasNode = find;
  const path: any[] = [];

  while (currentNode)  {
    path.unshift(currentNode.value);
    currentNode = traverseMap.get(currentNode)?.parent ?? null;
  }

  return path;
}
