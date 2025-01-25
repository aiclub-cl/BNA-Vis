'use client';
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  BackgroundVariant,
  ReactFlowProvider,
  ConnectionLineType,
  MarkerType,
  ConnectionMode,
  NodeTypes,
  DefaultEdgeOptions,
  useReactFlow,

} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import Bar from './components/UserTools';
import FileOptions from './components/FileOptions';
import { defaultNodes, defaultEdges } from './initial-elements';
import ShapeNodeComponent from './components/shape-node';
import Sidebar from './components/sidebar';
import MiniMapNode from './components/minimap-node';
import { ShapeNode, ShapeType } from './components/shape/types';

const nodeTypes: NodeTypes = {
  shape: ShapeNodeComponent,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  style: { strokeWidth: 2 },
};

const proOptions = { account: 'paid-pro', hideAttribution: true };

type ExampleProps = {
  theme?: 'dark' | 'light';
  snapToGrid?: boolean;
  panOnScroll?: boolean;
  zoomOnDoubleClick?: boolean;
};

function Home({
    theme = 'light',
    snapToGrid = true,
    panOnScroll = true,
    zoomOnDoubleClick = false,
  }: ExampleProps) {

  const { screenToFlowPosition, setNodes } = useReactFlow<ShapeNode>();

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
        colorMode={theme}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        defaultNodes={defaultNodes}
        defaultEdges={defaultEdges}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        connectionMode={ConnectionMode.Loose}
        panOnScroll={panOnScroll}
        onDrop={onDrop}
        snapToGrid={snapToGrid}
        snapGrid={[10, 10]}
        onDragOver={onDragOver}
        zoomOnDoubleClick={zoomOnDoubleClick}
        className="flex-row"
      >
        <Panel position="top-left"><FileOptions /></Panel>
        <Panel position="bottom-center"><Bar /></Panel>
        <Background color="#BFBFBF" className=""variant={BackgroundVariant.Dots} gap={16} size={1.2} />
        <Panel position="top-left">
          <Sidebar />
        </Panel>
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
