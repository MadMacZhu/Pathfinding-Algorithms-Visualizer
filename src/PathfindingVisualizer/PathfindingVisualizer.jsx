// 此应用中主要的数据结构节点（Node）是作为一个JSON对象存在的，
// 根据算法需要此对象具有多个属性，在动画实现过程中这些属性利用了
// React架构传递给了前端的HTML与CSS

import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {apath, agetNodesInShortestPathOrder} from '../algorithms/apath';
import {bfs, bgetNodesInShortestPathOrder} from '../algorithms/bfs';


import './PathfindingVisualizer.css';

const START_NODE_ROW = 7;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 32;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  gridhandleMouseDown() {
    this.setState({mouseIsPressed: true});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i < visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length-1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 25 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 25 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
      if (i< nodesInShortestPathOrder.length - 1){
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-shortest-path';
        }, 25 * i);
     }
     if (i === nodesInShortestPathOrder.length - 1) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 25 * i);

     }
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    document.getElementById(`node-${finishNode.row}-${finishNode.col}`).className =
    'node node-finish';
  }

  visualizeAPath() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = apath(grid, startNode, finishNode);
    const nodesInShortestPathOrder = agetNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    document.getElementById(`node-${finishNode.row}-${finishNode.col}`).className =
    'node node-finish';
  }

  visualizeBfs() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = bgetNodesInShortestPathOrder(finishNode);
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
    document.getElementById(`node-${finishNode.row}-${finishNode.col}`).className =
    'node node-finish';
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="legend">
          <p>Legend:</p>
          <div className="node-example1"></div>
          <p>Starting Node</p>
          <div className="node-example2"></div>
          <p>End Node</p>
          <div className="node-example3"></div>
          <p>Wall Node(Left-click to toggle)</p>
        </div>
        <div className="button-container">
          <p className="button-title">Visualize the Algorithms:</p>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.visualizeAPath()}>
            Visualize A*Path Algorithm
          </button>
          <button type="button" className="btn btn-primary btn-lg" onClick={() => this.visualizeBfs()}>
            Visualize Breadth First Search Algorithm
          </button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>
        <div onMouseDown = {() => this.gridhandleMouseDown()} onMouseUp={() => this.handleMouseUp()} className="grid-container">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const {row, col, isFinish, isStart, isWall} = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 16; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    fScore: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
