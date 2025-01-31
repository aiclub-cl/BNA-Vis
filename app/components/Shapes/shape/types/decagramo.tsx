import { type ShapeProps } from '.';

function Decagram({ width, height, ...svgAttributes }: ShapeProps) {
  const calculatePoints = () => {
    const points = [];
    const outerRadius = Math.min(width, height) / 2;
    // aqui´se ajusta el largo de las puntitas de la estrella
    const innerRadius = outerRadius * 0.7; 
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < 20; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / 10) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return points.join(' ');
  };

  return (
    <polygon
      points={calculatePoints()}
      {...svgAttributes}
    />
  );
}

export default Decagram;