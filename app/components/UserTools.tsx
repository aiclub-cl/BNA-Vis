import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/app/components/ui/popover"


import SidebarItem from './Shapes/FigureBar/figurebar-item';
import { ShapeComponents, ShapeType } from './Shapes/shape/types';

/*
en el  PopoverConten , se ocupa el codigo de el ejemplo de la carpeta FigureBar, 
-antes se llamaba sidebar-, copie el codigo para implementarlo en 
ese panel.
 */

export default function Bar() {
    
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div id ="bottomCenterPanel" className="bg-white border-black border rounded-lg flex w-80">
            {/* Left Side Buttons */}
            <div className="flex flex-col justify-center border-r border-black">
                {/* Mouse Button */}
                <button className="flex flex-1 justify-center items-center w-8 h-8 border-black rounded-tl-lg border-b bg-white hover:bg-gray-200">
                    <Image src="/svgs/mouse.svg" alt="Mouse Icon" width={16} height={16} draggable={false} />
                </button>
                {/* Hand Button */}
                <button className="flex flex-1 justify-center items-center w-8 h-8 bg-white rounded-bl-lg hover:bg-gray-200">
                    <Image src="/svgs/hand.svg" alt="Mouse Icon" width={15} height={15} draggable={false} />
                </button>
            </div>

            {/* Shapes */}
            <div className="flex items-end justify-center">
                <Popover>
                    <PopoverTrigger className="flex justify-center items-center h-full pt-2 px-2 wt-8 border-black border-r bg-white hover:bg-gray-200">
                        <Image src="/svgs/shapes.svg" alt="Shapes Icon" width={70} height={64} draggable={false} />
                    </PopoverTrigger>
                    
                    <PopoverContent className="w-md border-black">
                        
                        <div className="popover-label mb-2"></div>
                        <div className="popover-items flex flex-row flex-wrap gap-2">
                            {Object.keys(ShapeComponents).map((type) => (
                                <SidebarItem type={type as ShapeType} key={type} />
                            ))}
                        </div>

                    </PopoverContent>
                </Popover>
                <div
                    onDragStart={(event) => onDragStart(event, "group")}
                    draggable
                    className="flex justify-center items-center h-full px-4 cursor-grab hover:bg-gray-200"
                >
                    <Image src="/svgs/group.svg" alt="Group Icon" width={24} height={24} />
                </div>
            </div>
        </div>

    );
}