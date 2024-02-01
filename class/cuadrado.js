import { Figura } from './figuras.js';
import { Linea } from './linea.js';

class Cuadrado extends Figura {
    constructor(ctx, color, grosor, start, end) {
        super(ctx, color, grosor);
        // Recibe la diagonal del cuadrado
        this.start = start;
        this.end = end;
        
        //Objeto Linea
        this.linea = new Linea(ctx, color, grosor);
    }
    // Dibujar el cuadrado
    draw() {
        this.drawOutline(this.start, this.end);
    }
    // Dibujar el contorno del cuadrado
    drawOutline(start,end) {

        console.log("Dibujando Cuadrado");
        //cordenadas
        console.log(start.x + "," + start.y);
        console.log(end.x + "," + end.y);

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
       this.linea.drawDDA(cuadradoStart, { x: cuadradoEnd.x, y: cuadradoStart.y });
       this.linea.drawDDA({ x: cuadradoEnd.x, y: cuadradoStart.y }, cuadradoEnd);
       this.linea.drawDDA(cuadradoEnd, { x: cuadradoStart.x, y: cuadradoEnd.y });
       this.linea.drawDDA({ x: cuadradoStart.x, y: cuadradoEnd.y }, cuadradoStart);

    }
}

export { Cuadrado };