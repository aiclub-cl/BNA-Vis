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
  BackgroundVariant
} from '@xyflow/react';
import useUndoRedo from './components/utils/useUndoRedo';
import Bar from './components/UserTools';
import FileOptions from './components/FileOptions';
import '@xyflow/react/dist/style.css';

// Initial configuration for the React Flow canvas
const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

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