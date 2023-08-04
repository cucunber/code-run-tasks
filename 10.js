const V = 6, E = 6;

const startNode = 1;

const createVisitedNodeList = (V) => Array.from({ length: V + startNode }, () => false)

const topologySortStep = (matrix, visitedNodes, v, stack) => {
  visitedNodes[v] = true;
  for(let i = 0; i < matrix[v].length; i++){
    const node = matrix[v][i];
    if(!visitedNodes[node]){
      topologySortStep(matrix, visitedNodes, node, stack)
    }
  }
  stack.unshift(v);
}

const topologySort = (matrix) => {
  const visitedNodes = createVisitedNodeList(matrix.length);
  const stack = [];
  for(let v = startNode; v < V; v++){
    if(!visitedNodes[v]){
      topologySortStep(matrix, visitedNodes, v, stack)
    }
  }
  return stack
}

const createAdjacencyMatrix = (nodes, V) => {
  const matrix = Array.from({ length: V + startNode }, () => [])
  nodes.forEach((node) => {
    const [start, end] = node;
    matrix[start].push(end);
  })
  return matrix;
}

const solve = (nodes, V, E) => {
  const matrix = createAdjacencyMatrix(nodes, V);
  return topologySort(matrix)
}
