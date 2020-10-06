// 实现了A*路径搜索算法，主函数会返回一个由节点（Node）组成的序列,
// 其顺序记录了搜索进行过程中访问节点的顺序，在主应用（PathfindingVisulizer）
// 会被调用，借以绘制出搜索过程和最短路径。

export function apath(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.fScore = manhattanDistance(startNode, finishNode);
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByfScore(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      // If we encounter a wall, we skip it.
      if (closestNode.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid, finishNode);
    }
  }

  function manhattanDistance(currentNode, finishNode) {
      return Math.abs(currentNode.row - finishNode.row) + Math.abs(currentNode.col - finishNode.col);
  }
  
  function sortNodesByfScore(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore);
  }
  
  function updateUnvisitedNeighbors(node, grid, finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.fScore = neighbor.distance + manhattanDistance(neighbor, finishNode);
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function agetNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  