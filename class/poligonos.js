import { Linea } from './linea.js';
import {Figura} from "../class/figuras.js";

class Poligonos extends Figura {
    constructor(ctx, color, grosor, start, end, lados) {
        super(ctx, color, grosor);
        this.start = start; // Centro
        this.end = end; // Punto final del apotema
        //Convertir a numeros los "lados" del poligono
        this.lados = parseInt(lados);
    }

    draw() {
        if (!this.ctx) {
            console.error("El contexto del canvas no es válido.");
            return;
        }
        if (
            typeof this.start.x !== "number" ||
            typeof this.start.y !== "number" ||
            typeof this.end.x !== "number" ||
            typeof this.end.y !== "number" ||
            typeof this.lados !== "number"
        ) {
            // console.error("Las coordenadas y el número de lados deben ser números.");
            // console.log(this.start.x, this.start.y, this.end.x, this.end.y, this.lados)
            return;
        }

        // Limpiar el canvas antes de dibujar
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // Dibujar el polígono
        this.drawPoligono(this.start, this.end, this.lados);
    }

    drawPoligono(center, apotema, lados) {
        // console.log("imprimiendo Poligono")
        // Calcular el radio
        const radius = Math.sqrt(
            Math.pow(apotema.x - center.x, 2) +
            Math.pow(apotema.y - center.y, 2)
        );

        // Calcular el ángulo entre los lados
        const angle = (2 * Math.PI) / lados;

        // Calcular los vértices del polígono
        let vertices = [];
        for (let i = 0; i < lados; i++) {
            const x = center.x + radius * Math.cos(i * angle);
            const y = center.y + radius * Math.sin(i * angle);
            vertices.push({ x, y });
        }

        // Dibujar los lados del polígono
        for (let i = 0; i < vertices.length; i++) {
            const start = vertices[i];
            const end = vertices[(i + 1) % lados];
            const linea = new Linea(this.ctx, this.color, this.grosor, start, end);
            const puntos_linea=linea.draw();
            this.puntos.push(puntos_linea);
        }

        console.log(this.puntos);
       
    }
}

export {Poligonos};
