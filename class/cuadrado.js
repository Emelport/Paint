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
    drawOutline(start, end) {
        const cuadradoStart = {
            x: Math.min(start.x, end.x),
            y: Math.min(start.y, end.y)
        };

        const cuadradoEnd = {
            x: Math.max(start.x, end.x),
            y: Math.max(start.y, end.y)
        };

        // Dibujar el contorno del cuadrado y calcular puntos internos
        for (let x = cuadradoStart.x; x <= cuadradoEnd.x; x++) {
            for (let y = cuadradoStart.y; y <= cuadradoEnd.y; y++) {
                // Dibujar el contorno
                if (x === cuadradoStart.x || x === cuadradoEnd.x || y === cuadradoStart.y || y === cuadradoEnd.y) {
                    this.drawPixel(x, y);
                    this.puntos.push({ x: x, y: y });
                }
                // Calcular puntos internos
                else if (x > cuadradoStart.x && x < cuadradoEnd.x && y > cuadradoStart.y && y < cuadradoEnd.y) {
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