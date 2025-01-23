import Image from 'next/image';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function FileOptions() {
    return (
        <div className="bg-white border-black border rounded-lg flex">
            <p className="py-2 px-2 font-medium">File Name</p>
            <Menu as="div">
                <MenuButton className="inline-flex w-full h-full gap-x-1.5 justify-center items-center px-2 bg-white hover:bg-gray-200 rounded-r-lg">
                    <Image src="/dots.svg" alt="File Options" width={16} height={16} draggable={false} />
                </MenuButton>
                <MenuItems as="div" className="absolute left-100 mt-4 w-full bg-white border border-black rounded-lg shadow-lg">
                    <MenuItem as="button" className="flex items-center px-2 py-2 w-full rounded-t-lg hover:bg-gray-200">Export</MenuItem>
                    <MenuItem as="button" className="flex items-center px-2 py-2 w-full rounded-b-lg hover:bg-gray-200">New Project</MenuItem>
                </MenuItems>
            </Menu>
        </div>
    )
}