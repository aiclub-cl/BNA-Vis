import { type DragEvent, useRef } from 'react';

import Shape from '../shape';
import { type ShapeType } from '../shape/types';

type SidebarItemProps = {
  type: ShapeType;
};

function SidebarItem({ type }: SidebarItemProps) {
  const dragImageRef = useRef<HTMLDivElement>(null);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer?.setData('application/reactflow', type);

    if (dragImageRef.current) {
      event.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }
  };

  return (
    <div className="sidebar-item" draggable onDragStart={onDragStart}>
      <Shape
        type={type}
        fill="transparent"
        strokeWidth={1}
        width={20}
        height={20}
      />
      <div className="sidebar-item-drag-image" ref={dragImageRef}>
        <Shape
          type={type}
          width={40}
          height={40}
          fill="#F315FF"
          fillOpacity={0.7}
          stroke="#000000"
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

export default SidebarItem;
