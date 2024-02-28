import { Figura } from "./figuras.js";

class Elipse extends Figura {
  constructor(ctx, color, grosor, start, end) {
    super(ctx, color, grosor);
    this.start = start; // Centro
    this.end = end; // Punto final del radio
  }

  draw() {
    //Dibuja la elipse
    if (!this.ctx) {
      console.error("El contexto del canvas no es válido.");
      return;
    }

    if (
      typeof this.start.x !== "number" ||
      typeof this.start.y !== "number" ||
      typeof this.end.x !== "number" ||
      typeof this.end.y !== "number"
    ) {
      console.error("Las coordenadas y el radio deben ser números.");
      return;
    }

    // Limpiar el canvas antes de dibujar
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Dibujar la elipse
    this.drawElipse(this.start, this.end);
  }

  drawElipse(center, radius) {
    // Calcular el radio en X y Y
    const radiusX = Math.abs(radius.x - center.x);
    const radiusY = Math.abs(radius.y - center.y);

    // Calcular los puntos de la elipse
    const paso = 0.01;
    for (let t = 0; t < 2 * Math.PI; t += paso) {
      const x = center.x + radiusX * Math.cos(t);
      const y = center.y + radiusY * Math.sin(t);
      this.drawPixel(x, y); // L
      this.puntos.push({ x, y });
    }
    this.ctx.closePath();
  }

  isInside(start) {
    // Calcular si el punto está dentro de la elipse
    const radiusX = Math.abs(this.end.x - this.start.x) / 2;
    const radiusY = Math.abs(this.end.y - this.start.y) / 2;
    const centerX = (this.start.x + this.end.x) / 2;
    const centerY = (this.start.y + this.end.y) / 2;

    const x = start.x - centerX;
    const y = start.y - centerY;

    return (
      Math.pow(x, 2) / Math.pow(radiusX, 2) +
      Math.pow(y, 2) / Math.pow(radiusY, 2) <= 1
    );
  }

  

}

export { Elipse };