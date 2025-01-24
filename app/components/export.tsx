'use client'
import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/*
La funcion  getDiagramElements busca obtener todos los elementos dentro de 
el diagrama que no son el diagrama en sí.
*/

const getDiagramElements = (flowWrapper: HTMLElement) => {
  // obtiene todos los elementos que están 
  const allElements = Array.from(flowWrapper.querySelectorAll('*'));
  
  const diagramElements = allElements.filter(el => {
    const isNode = el.classList.contains('react-flow__node');
    const isEdge = el.classList.contains('react-flow__edge');
    const isNodeContent = el.closest('.react-flow__node');
    // aquí se filtra lo que es diagrama de lo que no:3
    if (isNode) {
      return true; 
    } else if (isEdge) {
      return true; 
    } else if (isNodeContent) {
      return true; 
    } else {
      return false; 
    }
  });

  // Obtener elementos a ocultar 
  const elementsToHide = allElements.filter(i=> 
    !diagramElements.includes(i) && 
    i instanceof HTMLElement
  ) as HTMLElement[];

  return { diagramElements, elementsToHide };
};


export function useExportPdf() {
  // falta implementar un mecánismo para ocultar los elementos de el diagrama que no sean el diagrama
  const exportToPdf = useCallback(() => {
    const flowWrapper = document.querySelector('.react-flow') as HTMLElement;
    if (!flowWrapper) return;

    toPng(flowWrapper, {
      quality: 0.95,
      backgroundColor: '#fff',
      filter: (node) => {
        const excludeClasses = ['react-flow__controls', 'react-flow__minimap'];
        return !excludeClasses.some(className => 
          node.classList?.contains(className)
        );
      }
    })
    .then((dataUrl) => {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [flowWrapper.clientWidth, flowWrapper.clientHeight]
      });

      pdf.addImage(
        dataUrl,
        'PNG',
        0,
        0,
        flowWrapper.clientWidth,
        flowWrapper.clientHeight
      );
      
      //aquí despúes hay que cambiar por el nombre de el diagrama
      pdf.save('diagrama-flujo.pdf');

    });
  }, []);

  return exportToPdf;
}

export default useExportPdf