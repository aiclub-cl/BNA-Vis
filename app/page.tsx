'use client';
/**
 * @fileoverview Main React Flow canvas implementation for BNA-Vis
 * This component handles the graph visualization and user interactions
 * including undo/redo functionality, node/edge management, and drag-drop operations
 */

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Panel,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  useReactFlow,
  NodeOrigin,
  Node,
  Edge,
  DefaultEdgeOptions,
  ProOptions,
  OnConnect,
  SelectionDragHandler,
  OnNodesDelete,
  OnEdgesDelete,
  OnNodeDrag,
  BackgroundVariant,
  ConnectionLineType,
  MarkerType,
  ConnectionMode,
  NodeTypes,
} from '@xyflow/react';

import useUndoRedo from './components/utils/useUndoRedo';
import Bar from './components/UserTools';
import FileOptions from './components/FileOptions';

import { defaultNodes, defaultEdges } from './initial-elements';
import ShapeNodeComponent from './components/shape-node';
import MiniMapNode from './components/minimap-node';
import { ShapeNode, ShapeType } from './components/shape/types';
import '@xyflow/react/dist/style.css';

// Initial configuration for the React Flow canvas
const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

const nodeTypes: NodeTypes = {
  shape: ShapeNodeComponent,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
};


// Default nodes and edges for the graph
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

// Sample labels for demonstration
const nodeLabels: string[] = [
  'Wire', 'your', 'ideas', 'with', 'React', 'Flow', '!',
];

/**
 * Home Component
 * Main canvas component that manages the graph state and user interactions
 * Implements undo/redo functionality and handles node/edge modifications
 */
function Home() {

  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, addNodes } = useReactFlow();

  /**
   * Handles new edge connections between nodes
   * Takes a snapshot for undo/redo functionality
   */
  const onConnect: OnConnect = useCallback(
    (connection) => {
      takeSnapshot();
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges, takeSnapshot]
  );

  /**
   * Handles clicks on the canvas pane
   * Creates new nodes at clicked position
   */
  const onPaneClick = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>) => {
      takeSnapshot();
      const position = screenToFlowPosition({ x: evt.clientX, y: evt.clientY });
      const label = nodeLabels.shift();
      addNodes([
        {
          id: `${new Date().getTime()}`,
          data: { label },
          position
        },
      ]);
      nodeLabels.push(`${label}`);
    },
    [takeSnapshot, addNodes, screenToFlowPosition]
  );

  // Event handlers for taking snapshots before modifications
  const onNodeDragStart: OnNodeDrag = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onNodesDelete: OnNodesDelete = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onEdgesDelete: OnEdgesDelete = useCallback(() => {
    takeSnapshot();
  }, [takeSnapshot]);

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  // this function is called when a node from the sidebar is dropped onto the react flow pane
  const onDrop: DragEventHandler = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const type = evt.dataTransfer.getData('application/reactflow') as ShapeType;

    // this will convert the pixel position of the node to the react flow coordinate system
    // so that a node is added at the correct position even when viewport is translated and/or zoomed in
    const position = screenToFlowPosition({ x: evt.clientX, y: evt.clientY });

    const newNode: ShapeNode = {
      id: Date.now().toString(),
      type: 'shape',
      position,
      style: { width: 100, height: 100 },
      data: {
        type,
        color: '#3F8AE2',
      },
      selected: true,
    };

    setNodes((nodes) =>
      (nodes.map((n) => ({ ...n, selected: false })) as ShapeNode[]).concat([
        newNode,
      ])
    );
  };

  return (
    <div className="relative w-screen h-screen bg-stone-100">
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={proOptions}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onSelectionDragStart={onSelectionDragStart}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onPaneClick={onPaneClick}
        selectNodesOnDrag={false}
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        connectionMode={ConnectionMode.Loose}
        onDrop={onDrop}
        snapGrid={[10, 10]}
        onDragOver={onDragOver}
      >
        <Panel position="top-left">
          <FileOptions 
            undo={undo} 
            redo={redo} 
            canUndo={canUndo} 
            canRedo={canRedo} 
          /></Panel>
        <Panel position="bottom-center"><Bar /></Panel>

        <Background color="#BFBFBF" className=""variant={BackgroundVariant.Dots} gap={16} size={1.2} />
        
        <Controls/>
        <MiniMap zoomable draggable nodeComponent={MiniMapNode} />
      </ReactFlow>
    </div>
  );
}

/**
 * ReactFlowWrapper Component
 * Wraps the main component with ReactFlowProvider for context; this is necessary for the ReactFlow component to work.
 * Evits the 001 error.
 */
function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <Home {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;