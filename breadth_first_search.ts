import { Graph, Node } from "./graph.ts";
import { Queue } from "./queue.ts";

export function iterative(graph: Graph, start: any, find: any): any[] {
  const startNode = graph.nodeForValue(start);
  const findNode = graph.nodeForValue(find);

  if (!startNode) {
    throw new Error('`start` does not exist in graph');
  }

  if (!findNode) {
    throw new Error('`find` does not exist in graph');
  }

  if (startNode === findNode) {
    return [startNode.value];
  }

  const queue = new Queue();
  queue.enqueue(startNode);
  const nodeToParent = new Map<Node, Node | null>();
  
  let found = false;
  while(queue.length && !found) {
    const node = queue.dequeue() as Node;

    for (const child of node.edges) {
      // already seen this node
      if (nodeToParent.has(child)) {
        continue;
      }

      nodeToParent.set(child, node);

      if (child === findNode) {
        found = true;
        break;
      }

      queue.enqueue(child);
    }
  }

  const pathToFindNode = nodeToParent.has(findNode);
  if (!pathToFindNode) {
    return [];
  }

  const path: Node[] = [];
  let n: Node | undefined = findNode;
  while (n) {
    path.unshift(n);
    n = nodeToParent.get(n)!;
  }

  const valuePath = path.map(node => node.value);
  return valuePath;
}

export function recursive(graph: Graph, start: any, find: any): any {
  const startNode = graph.nodeForValue(start);
  const findNode = graph.nodeForValue(find);

  if (!startNode) {
    throw new Error('`start` does not exist in graph');
  }

  if (!findNode) {
    throw new Error('`find` does not exist in graph');
  }

  if (startNode === findNode) {
    return [startNode.value];
  }

  const queue = new Queue();
  queue.enqueue(startNode);

  const nodeToParent = _searchRecursive(queue, findNode);
  const path = processNodeToParentMap(nodeToParent, findNode);
  return path;
}

function processNodeToParentMap(nodeToParent: Map<Node, Node>, current: Node, path: Node[] = []): Node[] {
  path.unshift(current.value);

  if (!nodeToParent.has(current)) {
    return path;
  }

  return processNodeToParentMap(nodeToParent, nodeToParent.get(current)!, path);
}

// Slightly cheating by using a Map and Queue to track state in the recursive solution
// Maybe worth revisiting later
function _searchRecursive(queue: Queue, find: Node, nodeToParent: Map<Node, Node> = new Map()) {
  if (queue.length === 0) {
    return nodeToParent;
  }

  if (nodeToParent.has(find)) {
    return nodeToParent;
  }

  const current = queue.dequeue() as Node;

  // add unseen children to map
  current.edges.forEach(child => {
    if (!nodeToParent.has(child)) {
      nodeToParent.set(child, current);
      queue.enqueue(child);
    }
  });

  return _searchRecursive(queue, find, nodeToParent);
}
