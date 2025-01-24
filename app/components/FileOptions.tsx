import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
    DropdownMenuSubContent,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/app/components/ui/dropdown-menu"

export default function FileOptions() {
    return (
        <div className="bg-white border-black border rounded-lg flex space-x-4">
            <p className="py-2 px-2 font-medium">ACME Inc.</p>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center px-2 py-2 rounded-r-lg hover:bg-gray-200">
                    <Image src="/svgs/dots.svg" alt="File Options" width={16} height={16} draggable={false} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-black rounded-lg shadow-lg">
                    {/* Start of Menu Options */}
                    <DropdownMenuItem>
                        Undo
                        <DropdownMenuShortcut>CTRL + Z</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Redo
                        <DropdownMenuShortcut>CTRL + Y</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* Separator */}
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>PDF</DropdownMenuItem>
                                <DropdownMenuItem>SVG</DropdownMenuItem>
                                <DropdownMenuItem>PNG</DropdownMenuItem>
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