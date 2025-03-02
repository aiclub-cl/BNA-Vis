import { NodeToolbar } from '@xyflow/react';

const colors = [
  '#9747FF',
  '#14AE5C',
  '#0D99FF',
  '#757575',
  '#F315FF',
  '#FFA629',
  '#F24822'
];

type ShapeNodeToolbarProps = {
  activeColor: string;
  onColorChange?: (color: string) => void;
};

function ShapeNodeToolbar({
  onColorChange = () => false,
  activeColor,
}: ShapeNodeToolbarProps) {
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
