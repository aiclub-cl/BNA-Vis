import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/app/components/ui/dropdown-menu"
import useExport from './utils/export';

interface FileOptionsProps {
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
}
  

export default function FileOptions({ undo, redo, canUndo, canRedo }: FileOptionsProps) {
    
    const exportToPdf = useExport('pdf');
    const exportToPng = useExport('png');

    return (
        <div id="topLeftPanel" className="bg-white border-black border rounded-lg flex gap-20">
            <p className="py-2 px-2 font-semibold truncate max-w-32">ACME Incorporated</p>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center px-2 py-2 rounded-r-lg hover:bg-gray-200">
                    <Image src="/svgs/dots.svg" alt="File Options" width={16} height={16} draggable={false} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-black rounded-lg shadow-lg">
                    {/* Start of Menu Options */}
                    <DropdownMenuItem disabled={canUndo} onClick={undo}>
                        Undo
                        <DropdownMenuShortcut>CTRL + Z</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={canRedo} onClick={redo}>
                        Redo
                        <DropdownMenuShortcut>CTRL + Y</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* Separator */}
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="border-black">
                                
                                <DropdownMenuItem onClick={exportToPdf}>
                                PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={exportToPng}>
                                PNG
                                </DropdownMenuItem>

                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* Separator */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>New Project</DropdownMenuItem>
                    {/* Separator */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub Account</DropdownMenuItem>
                    {/* End of Menu Options */}
                </DropdownMenuContent>
                    
            </DropdownMenu>
        </div>
    )
}