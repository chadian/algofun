export interface Node {
  value: any;
  edges: Node[];
}

export class Graph {
  nodes = new Map<Node["value"], Node>();

  createNode(value: any): Node {
    const { nodes } = this;

    if (nodes.has(value)) {
      return this.nodes.get(value)!;
    }

    const node = { value, edges: [] };
    nodes.set(value, node);
    return node;
  }

  nodeForValue(value: any): Node | undefined {
    return this.nodes.get(value);
  }

  connect({ from, to }: { from: any; to: any }) {
    const f = this.createNode(from);
    const t = this.createNode(to);
    f.edges.push(t);
  }
}
