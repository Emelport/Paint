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
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

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
    //   this.ctx.beginPath();
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, 1, 1);
    }
    this.ctx.closePath();
  }

}

export { Elipse };