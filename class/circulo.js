import { Figura } from "./figuras.js";

class Circulo extends Figura {
  constructor(ctx, color, grosor, start, end) {
    super(ctx, color, grosor);
    this.start = start; // Centro
    this.end = end; // Punto final del radio
  }

  draw() {
    if (!this.isValidData()) return;

    const radius = this.calculateRadius(this.start, this.end);
    this.drawBressenhamCircle(this.start, radius);
    this.calculateInnerPoints(this.start, radius);
  }

  isValidData() {
    if (!this.ctx) {
      console.error("El contexto del canvas no es válido.");
      return false;
    }

    if (
      typeof this.start.x !== "number" ||
      typeof this.start.y !== "number" ||
      typeof this.end.x !== "number" ||
      typeof this.end.y !== "number"
    ) {
      console.error("Las coordenadas y el radio deben ser números.");
      return false;
    }

    return true;
  }

  calculateRadius(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    return Math.sqrt(dx * dx + dy * dy) / 2;
  }

  drawBressenhamCircle(center, radius) {
    let x = radius;
    let y = 0;
    let P = 1 - radius;

    while (x >= y) {
      this.plotCirclePoints(center.x, center.y, x, y);
      y++;

      if (P <= 0) {
        P += 2 * y + 1;
      } else {
        x--;
        P += 2 * (y - x) + 1;
      }
    }
  }

  plotCirclePoints(centerX, centerY, x, y) {
    const points = [
      [centerX + x, centerY + y], // Octante 1
      [centerX - x, centerY + y], // Octante 2
      [centerX + x, centerY - y], // Octante 8
      [centerX - x, centerY - y], // Octante 7
      [centerX + y, centerY + x], // Octante 3
      [centerX - y, centerY + x], // Octante 4
      [centerX + y, centerY - x], // Octante 6
      [centerX - y, centerY - x], // Octante 5
    ];

    points.forEach(([x, y]) => {
      this.drawPixel(x, y);
      this.puntos.push({ x, y });
    });
  }

  calculateInnerPoints(center, radius) {
    this.puntosInternos = [];

    const radiusSquared = radius * radius;
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        if (x * x + y * y <= radiusSquared) {
          this.puntosInternos.push({
            x: center.x + x,
            y: center.y + y,
          });
        }
      }
    }
  }
}

export { Circulo };
