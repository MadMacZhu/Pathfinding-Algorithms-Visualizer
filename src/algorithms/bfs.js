// 实现了广度优先路径搜索算法，主函数本质上使用了队列这个数据结构
// 此外主函数会返回一个由节点（Node）组成的序列,
// 其顺序记录了搜索进行过程中访问节点的顺序，在主应用（PathfindingVisulizer）
// 会被调用，借以绘制出搜索过程和最短路径。

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nodesInQueue = [];
  visitedNodesInOrder.push(startNode);
  nodesInQueue.push(startNode);
  startNode.isVisited = true;
  while (!!nodesInQueue.length) {
    const closestNode = nodesInQueue.shift();
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = closestNode;
      if (neighbor === finishNode) return visitedNodesInOrder;
      neighbor.isVisited = true;
      nodesInQueue.push(neighbor);
      visitedNodesInOrder.push(neighbor);      
    }
  }
  return visitedNodesInOrder;
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => (!neighbor.isVisited && !neighbor.isWall));
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function bgetNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
