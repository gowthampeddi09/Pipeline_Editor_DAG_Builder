export function validateDAG(nodes, edges) {
  if (nodes.length < 2) return { isValid: false, message: 'Add at least 2 nodes' };

  const adj = {};
  nodes.forEach(n => (adj[n.id] = []));
  edges.forEach(e => adj[e.source]?.push(e.target));

  const visited = {}, recStack = {};
  let hasCycle = false;

  const dfs = (v) => {
    visited[v] = true;
    recStack[v] = true;

    for (let neighbor of adj[v] || []) {
      if (!visited[neighbor] && dfs(neighbor)) return true;
      else if (recStack[neighbor]) return true;
    }

    recStack[v] = false;
    return false;
  };

  for (let node of nodes) {
    if (!visited[node.id] && dfs(node.id)) {
      hasCycle = true;
      break;
    }
  }

  if (hasCycle) return { isValid: false, message: 'Cycle detected: Invalid DAG' };

  const connected = new Set();
  edges.forEach(e => {
    connected.add(e.source);
    connected.add(e.target);
  });

  const allConnected = nodes.every(n => connected.has(n.id));
  if (!allConnected) return { isValid: false, message: 'Some nodes are not connected' };

  return { isValid: true, message: 'Valid DAG' };
}