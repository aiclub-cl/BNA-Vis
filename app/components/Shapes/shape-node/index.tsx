import {
  NodeResizer,
  type NodeProps,
  useStore,
  Handle,
  Position,
  useKeyPress,
  useReactFlow,
} from '@xyflow/react';

import Shape from '../shape';
import ShapeNodeToolbar from '../toolbar';
import { type ShapeNode } from '../shape/types';
import NodeLabel from './label';

// this will return the current dimensions of the node (measured internally by react flow)
function useNodeDimensions(id: string) {
  const node = useStore((state) => state.nodeLookup.get(id));
  return {
    width: node?.measured?.width || 0,
    height: node?.measured?.height || 0,
  };
}


function ShapeNode({ id, selected, data }: NodeProps<ShapeNode>) {
  const { color, type } = data;
  const { setNodes } = useReactFlow();
  
  /*
  Aquí en allowedTypesForToolba se definen las figuras que 
  tendrán cambio de color
  */
  const allowedTypesForToolbar = ["circle",  "decagram"];
  const { width, height } = useNodeDimensions(id);
  const shiftKeyPressed = useKeyPress('Shift');
  const handleStyle = { backgroundColor: color };

  /*
  Aquí se definen los colores estaticos para el diamante y el cuadrado
  */
  const staticColors = {
    diamond: "#FF69B4",  //rosado
    rectangle: "#696969",  //gris 
  };

  const finalColor = staticColors[type as keyof typeof staticColors] || data.color;


  const onColorChange = (color: string) => {
    if (!allowedTypesForToolbar.includes(type)) return;
    
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        }

        return node;
      })
    );
  };
  
    /*
    */

  return (

    <>
        {type === 'circle' && (
          <ShapeNodeToolbar 
            onColorChange={onColorChange} 
            activeColor={finalColor} 
            type={'circle'} 
          />
        )}
        {type === 'decagram' && (
          <ShapeNodeToolbar 
            onColorChange={onColorChange} 
            activeColor={finalColor} 
            type={'star'} 
          />
        )}

      <NodeResizer
        color={finalColor}
        keepAspectRatio={shiftKeyPressed}
        isVisible={selected}
      />
      <Shape
        type={type}
        width={width}
        height={height}
        fill={finalColor}
        strokeWidth={2}
        stroke={finalColor}
        fillOpacity={0.8}
      />
      <Handle
        style={handleStyle}
        id="top"
        type="source"
        position={Position.Top}
      />
      <Handle
        style={handleStyle}
        id="right"
        type="source"
        position={Position.Right}
      />
      <Handle
        style={handleStyle}
        id="bottom"
        type="source"
        position={Position.Bottom}
      />
      <Handle
        style={handleStyle}
        id="left"
        type="source"
        position={Position.Left}
      />
      <NodeLabel placeholder={data.type} />
    </>
  );
}

export default ShapeNode;
