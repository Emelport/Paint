import { Figura } from './figuras.js';

class Cuadrado extends Figura {
  constructor(ctx, color, grosor, start, end) {
    super(ctx, color, grosor);
    this.start = start;
    this.end = end;
  }

  draw() {
    if (!this.isValidData()) return;

    const { x, y, lado } = this.calculateSquare();
    this.drawSquare(x, y, lado);
    this.fillInnerPoints(x, y, lado);
  }

  isValidData() {
    if (!this.ctx) {
      console.error("El contexto del canvas no es válido.");
      return false;
    }

    if (
      typeof this.start?.x !== "number" || // Uso de optional chaining para evitar errores si start es undefined
      typeof this.start?.y !== "number" ||
      typeof this.end?.x !== "number" ||
      typeof this.end?.y !== "number"
    ) {
      console.error("Las coordenadas deben ser números.");
      return false;
    }

    return true;
  }

  calculateSquare() {
    const x = this.start.x;
    const y = this.start.y;
    const lado = Math.max(
      Math.abs(this.start.x - this.end.x),
      Math.abs(this.start.y - this.end.y)
    );

    return { x, y, lado };
  }

  drawSquare(x, y, lado) {
    for (let i = 0; i <= lado; i++) {
      this.drawPixel(x + i, y); // Borde superior
      this.drawPixel(x + i, y + lado); // Borde inferior
      this.drawPixel(x, y + i); // Borde izquierdo
      this.drawPixel(x + lado, y + i); // Borde derecho

      // Guarda los puntos del borde
      this.puntos.push(
        { x: x + i, y: y }, 
        { x: x + i, y: y + lado }, 
        { x: x, y: y + i }, 
        { x: x + lado, y: y + i }
      );
    }
  }

  fillInnerPoints(x, y, lado) {
    this.puntosInternos = [];

    for (let i = 1; i < lado; i++) {
      for (let j = 1; j < lado; j++) {
        this.puntosInternos.push({ x: x + i, y: y + j });
      }
    }
  }

  clean() {
    [...this.puntos, ...this.puntosInternos].forEach(({ x, y }) => {
      this.borrarPixel(x, y);
    });

    this.puntos = [];
    this.puntosInternos = [];
  }
}

export { Cuadrado };