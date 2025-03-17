'use client';
/**
 * @fileoverview Main React Flow canvas implementation for BNA-Vis
 * This component handles the graph visualization and user interactions
 * including undo/redo functionality, node/edge management, and drag-drop operations
 */

import React, { useCallback, DragEvent } from 'react';
import {
  ReactFlow,
  Background,
  Panel,
  ReactFlowProvider,
  addEdge,
  Controls,
  useReactFlow,
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
  MiniMap
} from '@xyflow/react';

import useUndoRedo from './components/utils/useUndoRedo';
import Bar from './components/UserTools';
import FileOptions from './components/FileOptions';

import { defaultNodes, defaultEdges } from './initial-elements';
import ShapeNodeComponent from './components/Shapes/shape-node';
import MiniMapNode from './components/Shapes/minimap-node';
import { ShapeNode, ShapeType } from './components/Shapes/shape/types';
import '@xyflow/react/dist/style.css';
import DiagramLegend from './components/DiagramLegend';
import { LegendProvider, useLegend } from './context/DiagramLegendContext';
import BNALegend from './components/BNALegend';

// Initial configuration for the React Flow canvas
const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

// Initial style for the nodes
const nodeTypes: NodeTypes = {
  shape: ShapeNodeComponent,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
};

/**
 * Main canvas component that renders within the LegendProvider context
 */
function CanvasContent() {
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const { screenToFlowPosition, addNodes, setNodes, setEdges} = useReactFlow();
  const { addLegendItem, legendItems } = useLegend();

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

  const onDragOver = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  // this function is called when a node from the sidebar is dropped onto the react flow pane
  const onDrop = (evt: React.DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
    const type = evt.dataTransfer.getData('application/reactflow') as ShapeType;
    const fill = evt.dataTransfer.getData('shape-fill') || '#3F8AE2';

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
        color: fill,
      },
      selected: true,
    };

    // Add the node to the canvas
    setNodes((nodes) =>
      (nodes.map((n) => ({ ...n, selected: false })) as ShapeNode[]).concat([
        newNode,
      ])
    );

    // Add to legend when node is successfully dropped
    addLegendItem(type, fill);
  };

  return (
    <div className="relative w-screen h-screen bg-stone-100">
      <ReactFlow
        proOptions={proOptions}
        onConnect={onConnect}
        onNodeDragStart={onNodeDragStart}
        onSelectionDragStart={onSelectionDragStart}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
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
        <Panel position="top-left" className="space-y-2">
          <FileOptions 
            undo={undo} 
            redo={redo} 
            canUndo={canUndo} 
            canRedo={canRedo} 
          />
          <DiagramLegend items={legendItems} />
        </Panel>
        <Panel position="top-right" className="space-y-2">
          <BNALegend />
        </Panel>
        <Panel position="bottom-center"><Bar /></Panel>

        <Background color="#BFBFBF" className="" variant={BackgroundVariant.Dots} gap={16} size={1.2} />
        
        <Controls/>
        <MiniMap zoomable draggable nodeComponent={MiniMapNode} />
      </ReactFlow>
    </div>
  );
}

/**
 * Home Component
 * Wraps CanvasContent with the LegendProvider
 */
function Home() {
  return (
    <LegendProvider>
      <CanvasContent />
    </LegendProvider>
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