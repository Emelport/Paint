import { Linea } from './linea.js';
import { Figura } from '../class/figuras.js';

class Poligonos extends Figura {
  constructor(ctx, color, grosor, start, end, lados) {
    super(ctx, color, grosor);
    this.start = start;
    this.end = end;
    this.lados = parseInt(lados) || 3; // Asegurar que lados sea un número válido
  }

  draw() {
    if (!this.isValidData()) return;

    this.drawPoligono(this.start, this.end, this.lados);
  }

  isValidData() {
    if (!this.ctx) {
      console.error("El contexto del canvas no es válido.");
      return false;
    }

    if (
      typeof this.start?.x !== 'number' ||
      typeof this.start?.y !== 'number' ||
      typeof this.end?.x !== 'number' ||
      typeof this.end?.y !== 'number' ||
      typeof this.lados !== 'number' ||
      this.lados < 3
    ) {
      console.error("Las coordenadas y el número de lados deben ser números válidos (mínimo 3 lados).");
      return false;
    }

    return true;
  }

  drawPoligono(center, apotema, lados) {
    const radius = Math.sqrt(
      Math.pow(apotema.x - center.x, 2) +
      Math.pow(apotema.y - center.y, 2)
    );

    const angle = (2 * Math.PI) / lados;
    let vertices = [];

    // ✅ Calcular los vértices del polígono
    for (let i = 0; i < lados; i++) {
      const x = Math.round(center.x + radius * Math.cos(i * angle));
      const y = Math.round(center.y + radius * Math.sin(i * angle));
      vertices.push({ x, y });
    }

    // ✅ Dibujar los lados usando Linea
    for (let i = 0; i < lados; i++) {
      const start = vertices[i];
      const end = vertices[(i + 1) % lados];
      const linea = new Linea(this.ctx, this.color, this.grosor, start, end);
      linea.draw();

      // Guardar los puntos de los lados
      this.puntos.push(start, end);
    }

    // ✅ Calcular los puntos internos del polígono
    this.calcularPuntosInternosDelPoligono(vertices);
  }

  calcularPuntosInternosDelPoligono(vertices) {
    this.puntosInternos = [];

    // Obtener coordenadas mínimas y máximas de Y
    const minY = Math.min(...vertices.map(v => v.y));
    const maxY = Math.max(...vertices.map(v => v.y));

    for (let y = minY + 1; y < maxY; y++) {
      let intersections = [];

      for (let i = 0; i < vertices.length; i++) {
        const start = vertices[i];
        const end = vertices[(i + 1) % vertices.length];

        if ((start.y <= y && end.y >= y) || (end.y <= y && start.y >= y)) {
          const x = Math.round(
            start.x + ((end.x - start.x) * (y - start.y)) / (end.y - start.y)
          );
          intersections.push({ x, y });
        }
      }

      intersections.sort((a, b) => a.x - b.x);

      for (let i = 0; i < intersections.length - 1; i += 2) {
        for (let x = intersections[i].x; x < intersections[i + 1].x; x++) {
          this.puntosInternos.push({ x, y });
        }
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

export { Poligonos };
