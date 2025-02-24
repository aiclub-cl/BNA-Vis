import { SVGAttributes } from 'react';
import type { Node } from '@xyflow/react';

/*
Quite temporalmente alguna de las formas, pero si estimamos conveniente 
aquí podemos quitar/agregar formas
*/

import Circle from './circle';
import Rectangle from './rectangle';
import Diamond from './diamond';
import Decagram from'./decagramo';


//import RoundRectangle from './round-rectangle';
//import Hexagon from './hexagon';
//import ArrowRectangle from './arrow-rectangle';
//import Cylinder from './cylinder';
//import Triangle from './triangle';
//import Parallelogram from './parallelogram';
//import Plus from './plus';


// here we register all the shapes that are available
// you can add your own here
export const ShapeComponents = {
  circle: Circle,
  rectangle: Rectangle,
  decagram: Decagram,
  diamond: Diamond,


};

export type ShapeType = keyof typeof ShapeComponents;

export type ShapeProps = {
  width: number;
  height: number;
} & SVGAttributes<SVGElement>;

export type ShapeComponentProps = Partial<ShapeProps> & { type: ShapeType };

export type ShapeNode = Node<{
  type: ShapeType;
  color: string;
}>;
