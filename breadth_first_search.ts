import { Graph, Node } from "./graph.ts";
import { Queue } from "./queue.ts";

export function search(graph: Graph, start: any, find: any): any[] {
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
