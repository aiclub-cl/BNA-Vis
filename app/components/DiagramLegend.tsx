"use client";

import { useState } from 'react';

export type LegendItem = {
  id: string;
  color: string;
  label: string;
  shape: 'circle' | 'rectangle' | 'rounded' | string;
};

interface LegendProps {
  items: LegendItem[];
}

export default function DiagramLegend({ items = [] }: LegendProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return (
        <div className={`border-black border rounded-lg flex flex-col overflow-hidden transition-colors duration-300 ease-in-out ${isExpanded ? 'bg-black' : 'bg-white'}`}>
            <div 
                className="flex justify-between items-center cursor-pointer py-2 px-2"
                onClick={toggleExpand}
            >
                <p className={`font-medium transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-black'}`}>Legend</p>
                <button className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : 'text-black'}`}>
                    ▼
                </button>
            </div>
            
            <div 
                className={`bg-white transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
                style={{ overflow: 'hidden' }}
            >
                <div className="border-t border-gray-100 p-3">
                    <div className="space-y-2">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item.id} className="flex items-center gap-2">
                                    <div 
                                        className={`h-6 w-6 border-[0.12vw] border-black`}
                                        style={{ 
                                            backgroundColor: item.color,
                                            borderRadius: item.shape === 'circle' ? '50%' : 
                                                         item.shape === 'rounded' ? '4px' : '0'
                                        }}
                                    ></div>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500">No items to display</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}