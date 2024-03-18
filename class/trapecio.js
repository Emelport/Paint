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
    
        this.puntosInternos = this.calcularPuntosInternos(puntosSuperior, puntosInferior, puntosIzquierda, puntosDerecha);
        console.log(this.puntosInternos);
    }

    calcularPuntosInternos(puntosSuperior, puntosInferior, puntosIzquierda, puntosDerecha) {
        const puntos = [];
    
        // Calcular intersecciones entre los lados del trapecio
        const intersecciones = [];
        for (let i = 0; i < puntosSuperior.length; i++) {
            const puntoSuperior = puntosSuperior[i];
            const puntoInferior = puntosInferior[i];
            const interseccion = this.calcularInterseccion(puntoSuperior, puntoInferior, puntosIzquierda[i], puntosDerecha[i]);
            intersecciones.push(interseccion);
        }
    
        // Añadir puntos internos
        for (let i = 0; i < intersecciones.length; i++) {
            puntos.push(intersecciones[i]);
            if (i % 2 === 1) {
                // Añadir punto medio entre dos intersecciones consecutivas
                const puntoMedio = {
                    x: (intersecciones[i - 1].x + intersecciones[i].x) / 2,
                    y: (intersecciones[i - 1].y + intersecciones[i].y) / 2
                };
                puntos.push(puntoMedio);
            }
        }
    
        return puntos;
    }
    
    calcularInterseccion(punto1, punto2, punto3, punto4) {
        // Calcular la intersección de dos líneas
        const x =
            ((punto1.x * punto2.y - punto1.y * punto2.x) * (punto3.x - punto4.x) - (punto1.x - punto2.x) * (punto3.x * punto4.y - punto3.y * punto4.x)) /
            ((punto1.x - punto2.x) * (punto3.y - punto4.y) - (punto1.y - punto2.y) * (punto3.x - punto4.x));
        const y =
            ((punto1.x * punto2.y - punto1.y * punto2.x) * (punto3.y - punto4.y) - (punto1.y - punto2.y) * (punto3.x * punto4.y - punto3.y * punto4.x)) /
            ((punto1.x - punto2.x) * (punto3.y - punto4.y) - (punto1.y - punto2.y) * (punto3.x - punto4.x));
        return { x: x, y: y };
    }
    
    clean() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

export { Trapecio };
