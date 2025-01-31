import { NodeToolbar } from '@xyflow/react';

const colors_circle = [
  '#8A2BE2',
  '#438D57',
  '#3F8AE2',

];

const colors_star = [
  '#FF0000',  
  '#FFD700',   
]

type ShapeNodeToolbarProps = {
  activeColor: string;
  onColorChange?: (color: string) => void;
  type: string;
};

function ShapeNodeToolbar({
  onColorChange = () => false,
  activeColor,
  type,
}: ShapeNodeToolbarProps) {
  
  const colors = type === 'circle' ? colors_circle : colors_star;

  return (
    <NodeToolbar className="nodrag" offset={32}>
      {colors.map((color) => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
          className={`color-swatch ${color === activeColor ? 'active' : ''}`}
        />
      ))}
    </NodeToolbar>
  );
}

export default ShapeNodeToolbar;
