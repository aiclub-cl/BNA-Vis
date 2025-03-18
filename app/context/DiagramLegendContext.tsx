"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { LegendItem } from '../components/DiagramLegend';
import { ShapeType } from '../components/Shapes/shape/types';

interface LegendContextType {
  legendItems: LegendItem[];
  addLegendItem: (type: ShapeType, color: string) => void;
  removeLegendItem: (id: string) => void;
}

const LegendContext = createContext<LegendContextType | undefined>(undefined);

// Map shape types to legend shape values
const shapeTypeToLegendShape = {
  circle: 'circle',
  rectangle: 'rectangle',
  diamond: 'rectangle',
  hexagon: 'rounded',
  triangle: 'rounded',
  // Add more mappings as needed
};

export function LegendProvider({ children }: { children: ReactNode }) {
  const [legendItems, setLegendItems] = useState<LegendItem[]>([]);

  const addLegendItem = (type: ShapeType, color: string) => {
    // Create an ID for the new item (timestamp + random string)
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create a label based on the shape type
    const label = `${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    // Map the shape type to a legend shape
    const shape = shapeTypeToLegendShape[type as keyof typeof shapeTypeToLegendShape] || 'rectangle';
    
    const newItem: LegendItem = {
      id,
      color,
      label,
      shape,
    };

    setLegendItems((prevItems) => [...prevItems, newItem]);
  };

  const removeLegendItem = (id: string) => {
    setLegendItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <LegendContext.Provider value={{ legendItems, addLegendItem, removeLegendItem }}>
      {children}
    </LegendContext.Provider>
  );
}

export function useLegend() {
  const context = useContext(LegendContext);
  if (context === undefined) {
    throw new Error('useLegend must be used within a LegendProvider');
  }
  return context;
}