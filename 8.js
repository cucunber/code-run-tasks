const createVisitedNodeList = (V) => Array.from({ length: V}, () => false)

const dfsCollector = (matrix, startNode) => {
  const visitedNodes = createVisitedNodeList(matrix.length);
  const stack = [];
  stack.push(startNode);
  const result = [];
  while(stack.length){
    vertex = stack.pop();
    if(visitedNodes[vertex]){
      continue;
    };
    visitedNodes[vertex] = true;
    result.push(vertex);
    const adjeacencyNodes = matrix[vertex];
    for(let i = 0; i < adjeacencyNodes.length; i++){
      const node = adjeacencyNodes[i];
      if(node && !visitedNodes[i]){
        stack.push(i)
      }
    }
  }
  result.sort((a, b) => a - b);
  return result
}

const createAdjacencyMatrix = (nodes, V) => {
  const matrix = Array.from({ length: V + 1 }, () => Array.from({ length: V + 1 }))
  nodes.forEach((node) => {
    const [a, b] = node;
    matrix[a][b] = 1;
    matrix[b][a] = 1;
  })
  return matrix;
}

const solve = (nodes, V, E) => {
  const matrix = createAdjacencyMatrix(nodes, V);
  const components = new Map();
  matrix[0].forEach((_, index) => {
    const paths = dfsCollector(matrix, index);
    if(paths.length !== 1){
      const previousPaths = components.get(paths.join());
      if(previousPaths){
        components.set(paths.join(), [paths, previousPaths[1] + 1]);
        return;
      }
      components.set(paths.join(), [paths, 1])
    }
  })
  return components
}
