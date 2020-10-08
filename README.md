## 项目简介

本项目的灵感主要来自于：1. 本人在美教学时曾教过离散数学课程，其中有两章图论内容，详细介绍了几种路径搜索算法；2. 出现在2014年的一篇很有影响力的文章《[算法的视觉化](https://bost.ocks.org/mike/algorithms/)》。这个网页应用的后端架构是用JavaScript完成的，主要使用了一个JSON对象作为节点背后的数据结构，实现了三种常用的路径搜索算法：德克斯特拉算法、A\*路径算法、广度优先搜索算法。前端布局是建立在[Bootstrap](https://getbootstrap.com/)的模板之上，当然也外加了不少自己编写的HTML5和CSS3的语句，例如圆形节点是用CSS3编写的。

## 算法简介

**`德克斯特拉算法`**（Dijkstra's Algorithm）：原本属于加权图的路径搜索算法，本应用中认为水平、竖直方向相邻的节点间距离均为1；在搜索过程中需要不断依据未访问节点的已知距离进行“堆排序”（Heap Sort）， 其时间复杂度为O(nlogn)， 具体介绍见[这里](https://zhuanlan.zhihu.com/p/40338107)。

**`A\*路径算法`**（A\*Path Algorithm）: 在德克斯特拉算法的基础上进行了改进，在已知距离的基础上增加了一个H值（这里我使用的是曼哈顿距离），形成了新的F值，使得在已知目的地位置的前提下将搜索速度提高了很多；在搜索过程中需要不断依据未访问节点的已知F值进行“堆排序”（Heap Sort），其时间复杂度为O(nlogn)， 具体介绍见[这里](https://zhuanlan.zhihu.com/p/113008274)。

**`广度优先搜索`**（Bubble Sort）: 针对非加权图的路径搜索算法，相对简单，无需排序，运行很快，只需要队列这种数据结构即可实现，具体介绍见[这里](https://blog.csdn.net/raphealguo/article/details/7523411)。


## 操作提示：

**提示1**：左键单击可以增加“壁垒”节点，路径搜索过程中会主动绕开这些节点。

<img display="block" margin="auto" title="Wall" alt="Wall" width="800px" src="https://github.com/MadMacZhu/Pathfinding-Algorithms-Visualizer/blob/master/public/wall.png" />

**提示2**：目前版本中，起始和终点节点都尚不能调整，未来版本中会增加这项功能。


## 附注：

这个项目是使用了 [Create React App](https://github.com/facebook/create-react-app) 的网络框架实现的。

