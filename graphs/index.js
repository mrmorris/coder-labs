// undirected (not directed)
const graphSampleMap = new Map([
  ['nyc', ['newark', 'boston']],
  ['newark', ['nyc', 'washington']],
  ['boston', ['nyc', 'vermont']],
  ['washington', ['newark']]
]);

// create graph data structure (of nodes, edges)

class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = [];
  }
  
  addAdjacent(destinationNode) {
    this.adjacents.push(destinationNode);
  }
  
  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if (index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }
  
  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}

// you use this by adding "edges" more than "nodes", internally it uses nodes
class Graph {
  constructor() {
    this.nodes = new Map();
    this.edgeDirection = Graph.UNDIRECTED;
  }
  
  addVertex(value) {
    if (this.nodes.has(value)) {
      return this.nodes.get(value);
    }
       
    const vertex = new Node(value);
    this.nodes.set(value, vertex);
    
    return vertex;
  }
  
  removeVertex(value) {
    const targetNode = this.nodes.get(value);
    
    if (targetNode) {
      // for each edge I should remove self...
      for (let eachNode of this.nodes.values()) {
        eachNode.removeAdjacent(targetNode);
      }
      
    }
    
    return this.nodes.delete(value);
  }
  
  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);
    
    sourceNode.addAdjacent(destinationNode);
    
    // @todo - in undirected graph, we would add an edge in both directions
    destinationNode.addAdjacent(sourceNode);
    
    return [sourceNode, destinationNode];
  }
  
  removeEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);
    
    if (sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);
      
      // in undirected graph we remove edge both directions...
      destinationNode.removeAdjacent(sourceNode);
    }
  }
}

Graph.UNDIRECTED = 'undirected';

const sampleGraph = new Graph();
sampleGraph.addEdge('newyork', 'newark');
sampleGraph.addEdge('newyork', 'boston');
sampleGraph.addEdge('newark', 'washington');
//console.log(sampleGraph);

sampleGraph.removeEdge('boston', 'newyork');
//console.log(sampleGraph);

const graphOfNodes = {
  id: 1,
  data: 5,
  children: [
    {id: 3, data: 2, children: []},
    {id: 92, data: 8, children: [
      {id: 2, data: 53, children: []}
    ]},
    {id: 9, data: 1, children: [
      {id: 13, data: 8, children: []}, 
      {id: 23, data: 7, children: []}
    ]}
  ]
}

// find max data
function getMaxData(graphRoot) {
  
  const foundResults = [];
  function emit(node) {
    foundResults.push(node);
  }
  
  walk(graphRoot, (node) => {
    return node.data === 8;
  }, emit);
  
  console.log(foundResults, 'found');  
}


function walk(node, testFn, emitFn) {
   console.log('walking', node.id);

  if (testFn(node)) {
    emitFn(node);
  }
  
  if (!node.children || !node.children.length) {
    return;
  }
  
  for (let childNode of node.children) {
    walk(childNode, testFn, emitFn);
   
  }
}

getMaxData(graphOfNodes);

// convert "graph" to "binary search tree"


