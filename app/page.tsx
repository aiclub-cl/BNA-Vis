'use client';
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

{/* Utils */}
import useUndoRedo from './components/utils/useUndoRedo';

{/* Components */}
import Bar from './components/UserTools';
import FileOptions from './components/FileOptions';

{/* Style */}
import '@xyflow/react/dist/style.css';

{/* Initial Configuration */}
const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeLabels: string[] = [
  'Wire',
  'your',
  'ideas',
  'with',
  'React',
  'Flow',
  '!',
];

{/* Node Labels */}
function Home() {
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition, addNodes } = useReactFlow();

  const onConnect: OnConnect = useCallback(
    (connection) => {
      // 👇 make adding edges undoable
      takeSnapshot();
      setEdges((edges) => addEdge(connection, edges));
    },
    [setEdges, takeSnapshot]
  );

  const onPaneClick = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>) => {
      // 👇 make adding nodes undoable
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

  const onNodeDragStart: OnNodeDrag = useCallback(() => {
    // 👇 make dragging a node undoable
    takeSnapshot();
    // 👉 you can place your event handlers here
  }, [takeSnapshot]);

  const onSelectionDragStart: SelectionDragHandler = useCallback(() => {
    // 👇 make dragging a selection undoable
    takeSnapshot();
  }, [takeSnapshot]);

  const onNodesDelete: OnNodesDelete = useCallback(() => {
    // 👇 make deleting nodes undoable
    takeSnapshot();
  }, [takeSnapshot]);

  const onEdgesDelete: OnEdgesDelete = useCallback(() => {
    // 👇 make deleting edges undoable
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

function ReactFlowWrapper(props: any) {
  return (
    <ReactFlowProvider>
      <Home {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;