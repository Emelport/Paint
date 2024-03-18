import { Figura } from './figuras.js';
import { Linea } from './linea.js';

class Trapecio extends Figura {
    constructor(ctx, color, grosor, start, end) {
        super(ctx, color, grosor);
        this.start = start;
        this.end = end;
        this.puntosInternos = []; // Almacena los puntos internos del trapecio
    }

    draw() {
        // Calcular las coordenadas de los vértices del trapecio
        const baseMayor = Math.abs(this.end.x - this.start.x);
        const baseMenor = baseMayor * 0.6; // Establecemos la proporción deseada entre las bases
        const altura = Math.abs(this.end.y - this.start.y);
        
        const puntoSuperiorIzquierdo = { x: this.start.x, y: this.start.y };
        const puntoSuperiorDerecho = { x: this.end.x, y: this.start.y };
        const puntoInferiorIzquierdo = { x: this.start.x + ((baseMayor - baseMenor) / 2), y: this.end.y };
        const puntoInferiorDerecho = { x: puntoInferiorIzquierdo.x + baseMenor, y: this.end.y };

        const lineaSuperior = new Linea(this.ctx, this.color, this.grosor, puntoSuperiorIzquierdo, puntoSuperiorDerecho);
        const lineaInferior = new Linea(this.ctx, this.color, this.grosor, puntoInferiorIzquierdo, puntoInferiorDerecho);
        const lineaIzquierda = new Linea(this.ctx, this.color, this.grosor, puntoSuperiorIzquierdo, puntoInferiorIzquierdo);
        const lineaDerecha = new Linea(this.ctx, this.color, this.grosor, puntoSuperiorDerecho, puntoInferiorDerecho);

        // Dibujar las líneas y calcular los puntos internos
        const puntosSuperior = lineaSuperior.draw();
        const puntosInferior = lineaInferior.draw();
        const puntosIzquierda = lineaIzquierda.draw();
        const puntosDerecha = lineaDerecha.draw();
        
        //Almacenar todos los puntos en this.puntos
        this.puntos = puntosSuperior.concat(puntosInferior, puntosIzquierda, puntosDerecha);
    
        // this.puntosInternos = this.calcularPuntosInternos(puntosSuperior, puntosInferior, puntosIzquierda, puntosDerecha);
        // console.log(this.puntosInternos);
    }
}

export { Trapecio };
