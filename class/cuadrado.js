import { Figura } from './figuras.js';

class Cuadrado extends Figura {
    constructor(ctx, color, grosor, start, end) {
        super(ctx, color, grosor);
        // Recibe las esquinas del cuadrado
        this.start = start;
        this.end = end;
    }

    // Dibujar el cuadrado
    draw() {
        // Calcular las coordenadas del cuadrado
        const minX = Math.min(this.start.x, this.end.x);
        const minY = Math.min(this.start.y, this.end.y);
        const maxX = Math.max(this.start.x, this.end.x);
        const maxY = Math.max(this.start.y, this.end.y);
        
        // El lado del cuadrado debe ser el mayor de las diferencias entre las coordenadas
        const lado = Math.max(maxX - minX, maxY - minY);

        // Asegurarnos de que el cuadrado siempre tenga las dimensiones correctas (lado x lado)
        const x = minX;
        const y = minY;

        // Dibujar el cuadrado
        this.drawSquare(x, y, lado);
    }

    drawSquare(x, y, lado) {
        for (let i = x; i < x + lado; i++) {
            for (let j = y; j < y + lado; j++) {
                if (i === x || i === x + lado - 1 || j === y || j === y + lado - 1) {
                    this.drawPixel(i, j);
                    this.puntos.push({ x: i, y: j });
                } else {
                    this.puntosInternos.push({ x: i, y: j });
                }
            }
        }
    }

    // Método para limpiar el cuadrado
    clean() {
        this.puntos.forEach(punto => {
            this.borrarPixel(punto.x, punto.y);
        });
    }
}

export { Cuadrado };
