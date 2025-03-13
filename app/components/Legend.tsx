"use client";

import { useState } from 'react';

export default function Legend() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return (
        <div className="bg-white border-black border rounded-lg flex flex-col overflow-hidden">
            <div 
                className="flex justify-between items-center cursor-pointer py-2 px-2"
                onClick={toggleExpand}
            >
                <p className="font-medium">Legend</p>
                {/* Icon to be changed !!! */}
                <button className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ↓
                </button>
            </div>
            
            <div 
                className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                style={{ overflow: 'hidden' }}
            >
                <div className="border-t border-gray-100 p-3">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-blue-500 border-2 border-black rounded-full"></div>
                            <span>Item 1</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-green-500 border-2 border-black"></div>
                            <span>Item 2</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-red-500 border-2 border-black rounded-full"></div>
                            <span>Item 3</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}