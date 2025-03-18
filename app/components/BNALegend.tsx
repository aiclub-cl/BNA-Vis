"use client";

import { useState } from 'react';

export default function BNALegend() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
      return (
            <div className={`border-black border rounded-lg flex flex-col overflow-hidden transition-colors duration-300 ease-in-out ${isExpanded ? 'bg-black' : 'bg-white'}`}>
                <div 
                    className="flex justify-between items-center cursor-pointer py-2 px-2 space-x-6"
                    onClick={toggleExpand}
                >
                    <p className={`font-medium transition-colors duration-300 ${isExpanded ? 'text-white' : 'text-black'}`}>What does each shape mean?</p>
                    <button className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : 'text-black'}`}>
                        ▼
                    </button>
                </div>
                
                <div 
                    className={`bg-white transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="border-t border-gray-100 p-3">
                        <div className="space-y-4">
                            {/* Societal Bias */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-[0.12vw] border-black bg-[#9747FF]"></div>
                                <span className="text-sm font-medium">Societal Bias</span>
                            </div>
                            
                            {/* Cognitive Bias */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-[0.12vw] border-black bg-[#14AE5C]"></div>
                                <span className="text-sm font-medium">Cognitive Bias</span>
                            </div>
                            
                            {/* Technical Bias */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-[0.12vw] border-black bg-[#0D99FF]"></div>
                                <span className="text-sm font-medium">Technical Bias</span>
                            </div>
                            
                            {/* Material Limitations */}
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 border-[0.12vw] border-black bg-[#757575]"></div>
                                <span className="text-sm font-medium">Material Limitations</span>
                            </div>
                            
                            {/* Decision-Making */}
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-sm border-[0.12vw] border-black bg-[#F315FF] rotate-45"></div>
                                <span className="text-sm font-medium">Decision-Making</span>
                            </div>
                            
                            {/* Model Outcome */}
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 border-[0.12vw] border-black bg-[#FFA629]"></div>
                                <span className="text-sm">Model Outcome</span>
                            </div>
                            
                            {/* System Outcome */}
                            <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 border-[0.12vw] border-black bg-[#F24822]"></div>
                                <span className="text-sm">System Outcome</span>
                            </div>
                            
                            {/* Causal Direct Relation */}
                            <div className="flex items-center space-x-3">
                                <svg className="w-7 h-7 text-[#868686]" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
                                </svg>
                                <span className="text-sm">Causal Direct Relation</span>
                            </div>
                            
                            {/* Derived or Indirect Relation */}
                            <div className="flex items-center space-x-3">
                                <svg className="w-7 h-7 text-[#868686]" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
                                </svg>
                                <span className="text-sm">Derived or Indirect Relation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }