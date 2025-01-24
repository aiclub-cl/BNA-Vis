import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/app/components/ui/popover"

export default function Bar() {

    return (
        <div className="bg-white border-black border rounded-lg flex w-80">
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

                    </PopoverContent>
                </Popover>
            </div>
        </div>

    );
}