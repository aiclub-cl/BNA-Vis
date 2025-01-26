import { type Edge } from '@xyflow/react';
import { type ShapeNode } from './components/shape/types';

export const defaultNodes: ShapeNode[] = [
  {
    id: '1',
    type: 'shape',
    position: { x: 0, y: 0 },
    style: { width: 120, height: 60 },
    data: {
      type: 'round-rectangle',
      color: '#3F8AE2',
    },
  },
  {
    id: '2',
    type: 'shape',
    position: { x: 10, y: 120 },
    style: { width: 100, height: 100 },
    data: {
      type: 'diamond',
      color: '#EA9C41',
    },
  },
  {
    id: '3',
    type: 'shape',
    position: { x: -160, y: 130 },
    style: { width: 80, height: 80 },
    data: {
      type: 'circle',
      color: '#438D57',
    },
  },

  {
    id: '5',
    type: 'shape',
    position: { x: 380, y: 280 },
    style: { width: 100, height: 100 },
    data: {
      type: 'rectangle',
      color: '#438D57',
    },
  },

];

export const defaultEdges: Edge[] = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: '2->3',
    source: '2',
    target: '3',
    sourceHandle: 'left',
    targetHandle: 'right',
  },
  {
    id: '2->4',
    source: '2',
    target: '4',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
  {
    id: '4->5',
    source: '4',
    target: '5',
    sourceHandle: 'right',
    targetHandle: 'top',
  },
  {
    id: '3->6',
    source: '3',
    target: '6',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: '6->7',
    source: '6',
    target: '7',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
  {
    id: '4->7',
    source: '4',
    target: '7',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: '7->8',
    source: '7',
    target: '8',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: '5->9',
    source: '5',
    target: '9',
    sourceHandle: 'left',
    targetHandle: 'top',
  },
  {
    id: '6->10',
    source: '6',
    target: '10',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: '10->8',
    source: '10',
    target: '8',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
];
