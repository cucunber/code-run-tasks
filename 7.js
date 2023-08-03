const createVisitedNodeList = (V) => Array.from({ length: V}, () => false)

const dfsCollector = (matrix) => {
  const visitedNodes = createVisitedNodeList(matrix.length);
  const stack = [];
  stack.push(1);
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
  console.table(matrix)
  return dfsCollector(matrix);
}
