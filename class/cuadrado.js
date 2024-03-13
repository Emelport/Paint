import { Figura } from './figuras.js';

class Cuadrado extends Figura {
    constructor(ctx, color, grosor, start, end) {
        super(ctx, color, grosor);
        // Recibe la diagonal del cuadrado
        this.start = start;
        this.end = end;

    }
    // Dibujar el cuadrado
    draw() {
        this.drawOutline(this.start, this.end);
    }
    // Dibujar el contorno del cuadrado
   // Método para dibujar el contorno del rectángulo
    drawOutline(start, end) {
        // Obtener las coordenadas del rectángulo
        const rectStartX = Math.min(start.x, end.x);
        const rectStartY = Math.min(start.y, end.y);
        const rectEndX = Math.max(start.x, end.x);
        const rectEndY = Math.max(start.y, end.y);

        // Dibujar el contorno del rectángulo y calcular puntos
        for (let x = rectStartX; x <= rectEndX; x++) {
            for (let y = rectStartY; y <= rectEndY; y++) {
                // Dibujar el contorno y calcular puntos
                if (x === rectStartX || x === rectEndX || y === rectStartY || y === rectEndY) {
                    this.drawPixel(x, y);
                    this.puntos.push({ x: x, y: y });
                }
                // Calcular puntos internos
                else {
                    this.puntosInternos.push({ x: x, y: y });
                }
            }
        }
    }

    // 
    clean() {
       //Por cada punto de la linea
         this.puntos.forEach(punto => {
              //Limpiar el punto
              this.borrarPixel(punto.x, punto.y);
         });
    }


}

export { Cuadrado };