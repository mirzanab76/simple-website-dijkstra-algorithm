// src/utils/dijkstra.js
import dijkstra from 'dijkstrajs';

const convertGraph = (graph) => {
  const convertedGraph = {};
  for (const node in graph) {
    convertedGraph[node] = {};
    for (const neighbor in graph[node]) {
      if (graph[node].is_active) {
        convertedGraph[node][neighbor] = graph[node][neighbor].distance;
      }
    }
  }
  return convertedGraph;
};

export const findShortestPath = (graph, start, end) => {
  const activeGraph = convertGraph(graph);
  const result = dijkstra.find_path(activeGraph, start, end);
  return result;
};
