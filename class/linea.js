// Clase para las líneas
import { Figura } from "./figuras.js";

class Linea extends Figura{

    constructor(ctx, color, grosor, start, end) {
        super(ctx, color, grosor);
        this.start = start;
        this.end = end;
    }

    draw() {
        // Implementar en las clases hijas
        // console.log("Dibujando Linea");
        this.drawDDA(this.start, this.end);
    }
    // Dibujar la línea
    // DIGITAL DIFFERENTIAL ANALYZER
    drawDDA(start, end) {
        // Algoritmo de DDA

        // Calcular la distancia entre los dos puntos
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        // Calcular el numero de pasos
        var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
        // Calcular el incremento para cada paso
        var xIncrement = dx / steps;
        var yIncrement = dy / steps;
        // Coordenada inicial
        var x = start.x;
        var y = start.y;
        // Dibujar cada punto
        for (var i = 0; i <= steps; i++) {
            // Redondear las coordenadas
            var roundedX = Math.round(x);
            var roundedY = Math.round(y);

            // Dependiendo del grosor, dibujar más píxeles alrededor del punto
            this.drawPixel(roundedX, roundedY);
            // Actualizar las coordenadas con el incremento
            x += xIncrement;
            y += yIncrement;
        }
    }

    // Formula General de la Recta y = mx + b
    drawGeneral(start, end) {
        // Ecuacion de la recta y = mx + b

        var dx = end.x - start.x;        // Delta x
        var dy = end.y - start.y;        // Delta y

        // Pendiente
        var m = dy / dx;
        var b = start.y - m * start.x;   // Ordenada en el origen

        // Intercambiar los puntos para que siempre se dibuje de izquierda a derecha
        if (start.x > end.x) {
            var temp = start;
            start = end;
            end = temp;
        }

        // Coordenada inicial
        var x = start.x;
        var y = start.y;

        // Determinar el cuadrante
        var xIncrement, yIncrement;

        if (Math.abs(m) <= 1) {
            xIncrement = 1;
            yIncrement = m;
        } else {
            xIncrement = 1 / Math.abs(m);
            yIncrement = m < 0 ? -1 : 1;
        }

        //Dibujar los puntos intermedios
        while (x <= end.x) {
            this.drawPixel(Math.round(x), Math.round(y));
            x += xIncrement;
            y += yIncrement;
        }

        // Pintar el punto final
        this.drawPixel(end.x, end.y);
    }

    // LINEA BRESENHAM
    drawBresenham(start, end) {
        // Algoritmo de Bresenham
        
        // Calcular la distancia entre los dos puntos
        var dx = Math.abs(end.x - start.x);
        var dy = Math.abs(end.y - start.y);
        
        var sx = (start.x < end.x) ? 1 : -1; // si el punto inicial es menor que el punto final entonces sx = 1, de lo contrario sx = -1
        var sy = (start.y < end.y) ? 1 : -1; // si el punto inicial es menor que el punto final entonces sy = 1, de lo contrario sy = -1
        // Calcular el pk
        var pk = dx - dy;

        while (true) {
            // Dependiendo del grosor, dibujar más píxeles alrededor del punto

            this.drawPixel(start.x, start.y);

            if ((start.x === end.x) && (start.y === end.y)) {
                break;
            }

            var e2 = 2 * pk; // 2 * Δpk

            // Formulas del algoritmo de Bresenham

            // Primera condición: e2 > -dy
            if (e2 > -dy) {
                pk -= dy;      // Δpk -= Δy
                start.x += sx;  // x += sx
            }

            // Segunda condición: e2 < dx
            if (e2 < dx) {
                pk += dx;      // Δpk += Δx
                start.y += sy;  // y += sy
            }
        }
    }

    cleanLine(start, end) {
        console.log("Limpiando Linea");
        //Limpiar la linea entre los puntos
        var x = start.x;
        var y = start.y;
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
        var xIncrement = dx / steps;
        var yIncrement = dy / steps;

        for (var i = 0; i <= steps; i++) {
            var roundedX = Math.round(x);
            var roundedY = Math.round(y);
            this.borrarPixel(roundedX, roundedY);
            x += xIncrement;
            y += yIncrement;
        }

    }
  
    

}

export { Linea };