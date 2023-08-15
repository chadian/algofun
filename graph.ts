export interface Node<NodeValue = any, EdgeMeta = any> {
  value: NodeValue;
  edges: { node: Node<NodeValue, EdgeMeta>; meta: EdgeMeta }[];
}

export class Graph<
  NodeValue = any,
  EdgeMeta extends Record<string, any> = Record<string, any>,
> {
  nodes = new Map<
    Node<NodeValue, EdgeMeta>["value"],
    Node<NodeValue, EdgeMeta>
  >();

  createNode(value: NodeValue): Node<NodeValue, EdgeMeta> {
    const { nodes } = this;

    if (nodes.has(value)) {
      return this.nodes.get(value)!;
    }

    const node = { value, edges: [] };
    nodes.set(value, node);

    return node;
  }

  nodeForValue(value: NodeValue): Node<NodeValue, EdgeMeta> | undefined {
    return this.nodes.get(value);
  }

  connect({
    from,
    to,
    meta,
  }: {
    from: NodeValue;
    to: NodeValue;
    meta?: EdgeMeta;
  }) {
    meta = meta ?? {} as EdgeMeta;
    const f = this.createNode(from);
    const t = this.createNode(to);

    f.edges.push({ node: t, meta });
  }
}
