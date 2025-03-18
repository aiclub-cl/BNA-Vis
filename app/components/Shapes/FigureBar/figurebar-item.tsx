import { type DragEvent, useRef } from 'react';

import Shape from '../shape';
import { type ShapeType } from '../shape/types';
import { useLegend } from '@/app/context/DiagramLegendContext';
type SidebarItemProps = {
  type: ShapeType;
  fill?: string;
  stroke?: string;
  onDragSuccess?: (type: ShapeType) => void;
};

function SidebarItem({ type, fill = "#F315FF", stroke = "#000000", onDragSuccess }: SidebarItemProps) {
  const dragImageRef = useRef<HTMLDivElement>(null);
  const { addLegendItem } = useLegend();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer?.setData('application/reactflow', type);
    event.dataTransfer?.setData('shape-fill', fill);

    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  };

  const handleDragSuccess = () => {
    // Add the item to the legend
    addLegendItem(type, fill);
    
    // Call the parent callback if provided
    if (onDragSuccess) {
      onDragSuccess(type);
    }
  };

  return (
    <div 
      className="sidebar-item" 
      draggable 
      onDragStart={onDragStart}
      data-shape-type={type} // Add data attribute to help identify this element
    >
      <div className="sidebar-item-drag-image" ref={dragImageRef}>
        <Shape
          type={type}
          width={40}
          height={40}
          fill={fill}
          fillOpacity={0.7}
          stroke={stroke}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

export default SidebarItem;