import { Figura } from './figuras.js';
import { Linea } from './linea.js';

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
    drawOutline(start,end) {
        // console.log("Dibujando Cuadrado");
        // //cordenadas
        // console.log(start.x + "," + start.y);
        // console.log(end.x + "," + end.y);

       // Calcular el ancho y alto del cuadrado
       var width = Math.abs(end.x - start.x);
       var height = Math.abs(end.y - start.y);
   
       // Determinar el punto de inicio y el punto final para el cuadrado
       var cuadradoStart = {
           x: (end.x > start.x) ? start.x : end.x,
           y: (end.y > start.y) ? start.y : end.y
       };
   
       var cuadradoEnd = {
           x: cuadradoStart.x + Math.min(width, height),
           y: cuadradoStart.y + Math.min(width, height)
       };
   
        // Dibujar el contorno del cuadrado
        const linea1 = new Linea(this.ctx, this.color, this.grosor, cuadradoStart, { x: cuadradoEnd.x, y: cuadradoStart.y });
        const linea2 = new Linea(this.ctx, this.color, this.grosor, { x: cuadradoEnd.x, y: cuadradoStart.y }, cuadradoEnd);
        const linea3 = new Linea(this.ctx, this.color, this.grosor, cuadradoEnd, { x: cuadradoStart.x, y: cuadradoEnd.y });
        const linea4 = new Linea(this.ctx, this.color, this.grosor, { x: cuadradoStart.x, y: cuadradoEnd.y }, cuadradoStart);

        this.puntos = linea1.draw();
        this.puntos = linea2.draw();
        this.puntos = linea3.draw();
        this.puntos = linea4.draw();
        // console.log(this.puntos);   
    }
    clean() {
       //Por cada punto de la linea
         this.puntos.forEach(punto => {
              //Limpiar el punto
              this.borrarPixel(punto.x, punto.y);
         });
    }

    isInside(start) {
        // Calcular si el punto está dentro del cuadrado
        var width = Math.abs(this.end.x - this.start.x);
        var height = Math.abs(this.end.y - this.start.y);
        var cuadradoStart = {
            x: (this.end.x > this.start.x) ? this.start.x : this.end.x,
            y: (this.end.y > this.start.y) ? this.start.y : this.end.y
        };
        var cuadradoEnd = {
            x: cuadradoStart.x + Math.min(width, height),
            y: cuadradoStart.y + Math.min(width, height)
        };

        if (start.x >= cuadradoStart.x && start.x <= cuadradoEnd.x && start.y >= cuadradoStart.y && start.y <= cuadradoEnd.y) {
            return true;
        }
        return false;
    }

}

export { Cuadrado };