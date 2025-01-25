'use client'
import { useCallback } from 'react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';


export function useExport(format: 'pdf' | 'svg' | 'png') {
  /* Esta funcion recive un parametro que indica la forma en la que se exportrara 
  el archivo, además, se encarga de ocultar los elementos que no deben estar 
  incluidos en la imagen final, y luego los restaura 
  -parte de este codigo fue generado con la ayuda de copilot- */
  
  
  const exportToFile = useCallback(() => {
    const topLeftPanel = document.getElementById('topLeftPanel') as HTMLElement;
    const bottomCenterPanel = document.getElementById('bottomCenterPanel') as HTMLElement;
    const flowWrapper = document.querySelector('.react-flow') as HTMLElement;
    if (!flowWrapper) return;

 
    if (topLeftPanel){ 
      topLeftPanel.style.display = 'none';
      console.log("panel encontrado");
    }
        
    if (bottomCenterPanel){
      bottomCenterPanel.style.display = 'none';
      console.log("boton encontrado");
    }
    

    if (format === 'png') {
      toPng(flowWrapper, {
        quality: 0.95,
        backgroundColor: '#fff',
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        // cambiar por el nombre de el diagrama cuando este esa opción
        link.download = 'diagrama-flujo.png';
        link.click();

       
        if (topLeftPanel) topLeftPanel.style.display = '';
        if (bottomCenterPanel) bottomCenterPanel.style.display = '';
      });
    } else if (format === 'svg') {
      const svg = flowWrapper.querySelector('svg');
      if (svg) {
        console.log("svg option")
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        // cambiar por el nombre de el diagrama cuando este esa opción
        link.download = 'diagrama-flujo.svg';
        link.click();
        URL.revokeObjectURL(url);
      }

      // Restaurar los paneles
      if (topLeftPanel) topLeftPanel.style.display = '';
      if (bottomCenterPanel) bottomCenterPanel.style.display = '';

    } else if (format === 'pdf') {
      toPng(flowWrapper, {
        quality: 0.95,
        backgroundColor: '#fff',
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
        // cambiar por el nombre de el diagrama cuando este esa opción
        pdf.save('diagrama-flujo.pdf');

        if (topLeftPanel) topLeftPanel.style.display = '';
        if (bottomCenterPanel) bottomCenterPanel.style.display = '';
      });
    }
  }, [format]);

  return exportToFile;
}

export default useExport