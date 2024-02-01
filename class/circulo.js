import { Figura } from "./figuras.js";

class Circulo extends Figura {
  constructor(ctx, color, grosor, start, end) {
    super(ctx, color, grosor);
    this.start = start; // Centro
    this.end = end; // Punto final del radio
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
      typeof this.end.y !== "number"
    ) {
      console.error("Las coordenadas y el radio deben ser números.");
      return;
    }

    // Limpiar el canvas antes de dibujar
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Dibujar el círculo
    this.drawBressenhamCircle(this.start, this.end);
  }

  drawPoints(centerX, centerY, x, y) {
    this.drawPixel(centerX + x, centerY + y); // Octante 1
    this.drawPixel(centerX - x, centerY + y); // Octante 2
    this.drawPixel(centerX + x, centerY - y); // Octante 8
    this.drawPixel(centerX - x, centerY - y); // Octante 7
  }

  drawBressenhamCircle(center, radius) {
    const radiusX = Math.abs(radius.x - center.x);
    const radiusY = Math.abs(radius.y - center.y);
    const radiusX2 = radiusX * radiusX;
    const radiusY2 = radiusY * radiusY;
    const twoRadiusX2 = 2 * radiusX2;
    const twoRadiusY2 = 2 * radiusY2;

    let p;
    let x = 0;
    let y = radiusY;
    let px = 0;
    let py = twoRadiusX2 * y;

    const drawnPoints = new Set();

    this.drawPoints(center.x, center.y, x, y);
    drawnPoints.add(`<span class="math-inline">\{center\.x\},</span>{center.y}`);

    //Calcular la curva de cada octante
    p = Math.round(radiusY2 - (radiusX2 * radiusY) + (0.25 * radiusX2));
    while (px < py) {
      x++;
      px += twoRadiusY2;
      if (p < 0) {
        p += radiusY2 + px;
      } else {
        y--;
        py -= twoRadiusX2;
        p += radiusY2 + px - py;
      }

      const key1 = `<span class="math-inline">\{center\.x \+ x\},</span>{center.y + y}`;
      const key2 = `<span class="math-inline">\{center\.x \- x\},</span>{center.y + y}`;
      const key3 = `<span class="math-inline">\{center\.x \+ x\},</span>{center.y - y}`;
      const key4 = `<span class="math-inline">\{center\.x \- x\},</span>{center.y - y}`;

      if (!drawnPoints.has(key1)) {
        this.drawPoints(center.x, center.y, x, y);
        drawnPoints.add(key1);
      }
      if (!drawnPoints.has(key2)) {
        this.drawPoints(center.x, center.y, -x, y);
        drawnPoints.add(key2);
      }
      if (!drawnPoints.has(key3)) {
        this.drawPoints(center.x, center.y, x, -y);
      }
        if (!drawnPoints.has(key4)) {
            this.drawPoints(center.x, center.y, -x, -y);
            drawnPoints.add(key4);
            }
        }

        p = Math.round(radiusY2 * (x + 0.5) * (x + 0.5) + radiusX2 * (y - 1) * (y - 1) - radiusX2 * radiusY2);
        while (y > 0) {
          y--;
          py -= twoRadiusX2;
          if (p > 0) {
            p += radiusX2 - py;
          } else {
            x++;
            px += twoRadiusY2;
            p += radiusX2 - py + px;
          }
    
          const key1 = `${center.x + x},${center.y + y}`;
          const key2 = `${center.x - x},${center.y + y}`;
          const key3 = `${center.x + x},${center.y - y}`;
          const key4 = `${center.x - x},${center.y - y}`;
    
          if (!drawnPoints.has(key1)) {
            this.drawPoints(center.x, center.y, x, y);
            drawnPoints.add(key1);
          }
          if (!drawnPoints.has(key2)) {
            this.drawPoints(center.x, center.y, -x, y);
            drawnPoints.add(key2);
          }
          if (!drawnPoints.has(key3)) {
            this.drawPoints(center.x, center.y, x, -y);
            drawnPoints.add(key3);
          }
          if (!drawnPoints.has(key4)) {
            this.drawPoints(center.x, center.y, -x, -y);
            drawnPoints.add(key4);
          }
        }
      }
    }
    
    export { Circulo };
    