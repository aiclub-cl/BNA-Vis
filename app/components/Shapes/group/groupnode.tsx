import { memo } from 'react';
import {
  NodeProps,
  NodeToolbar,
  useReactFlow,
  useStore,
  useStoreApi,
  NodeResizer,
} from '@xyflow/react';

import { GroupType, groupStyles } from './types';
import { getRelativeNodesBounds } from './utils';


//const lineStyle = { borderColor: 'white' };

interface GroupNodeData {
  type: GroupType;
}

interface ExtendedNodeProps extends NodeProps {
  data: GroupNodeData;
}

function GroupNode({ id, data }: ExtendedNodeProps) {
  const { deleteElements } = useReactFlow();
  const style = groupStyles[data.type || GroupType.PROBLEM_FORMULATION];

  const { minWidth, minHeight, hasChildNodes } = useStore((store) => {
    const childNodes = Array.from(store.nodeLookup.values()).filter(
      (n) => n.parentId === id
    );
    const rect = getRelativeNodesBounds(childNodes);

    return {
      minWidth: rect.x + rect.width,
      minHeight: rect.y + rect.height,
      hasChildNodes: childNodes.length > 0,
    };
  }, isEqual);

  const onDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    <div style={{
      backgroundColor: style.backgroundColor,
      borderColor: style.borderColor,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: '8px',
      padding: '12px',
      minWidth: '150px',
      minHeight: '10px'
    }}>
      <div style={{
        color: style.borderColor,
        fontWeight: 'bold',
        fontSize: '12px',
        marginBottom: '2px'
      }}>
        {style.label}
      </div>
      <NodeResizer
        lineStyle={{ borderColor: style.borderColor }}
        minHeight={minHeight}
        minWidth={minWidth}
      />
      <NodeToolbar className="nodrag">
        <button onClick={onDelete}>Delete</button>
        {hasChildNodes}
      </NodeToolbar>
    </div>
  );
}

type IsEqualCompareObj = {
  minWidth: number;
  minHeight: number;
  hasChildNodes: boolean;
};

function isEqual(prev: IsEqualCompareObj, next: IsEqualCompareObj): boolean {
  return (
    prev.minWidth === next.minWidth &&
    prev.minHeight === next.minHeight &&
    prev.hasChildNodes === next.hasChildNodes
  );
}

export default memo(GroupNode);
