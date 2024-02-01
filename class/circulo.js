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

        if (typeof this.start.x !== "number" || typeof this.start.y !== "number" ||
            typeof this.end.x !== "number" || typeof this.end.y !== "number") {
            console.error("Las coordenadas y el radio deben ser números.");
            return;
        }

        // Limpiar el canvas antes de dibujar
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Dibujar el círculo
        this.drawBressenham(this.start, this.end);

        // Dibujar la línea desde el centro hasta el borde del círculo
        this.drawLine(this.start.x, this.start.y, this.end.x, this.end.y);
    }

    drawPoints(centerX, centerY, x, y) {
        this.drawPixel(centerX + x, centerY + y); // Octante 1
        this.drawPixel(centerX - x, centerY + y); // Octante 2
        this.drawPixel(centerX + x, centerY - y); // Octante 8
        this.drawPixel(centerX - x, centerY - y); // Octante 7
        this.drawPixel(centerX + y, centerY + x); // Octante 3
        this.drawPixel(centerX - y, centerY + x); // Octante 4
        this.drawPixel(centerX + y, centerY - x); // Octante 5
        this.drawPixel(centerX - y, centerY - x); // Octante 6
    }

    drawBressenham(center, radius) {
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

        this.drawPoints(center.x, center.y, x, y);

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
            this.drawPoints(center.x, center.y, x, y);
        }
        
        // Región 2
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
            this.drawPoints(center.x, center.y, x, y);
        }

        // Pintar el punto final
        
    }

    drawLine(x0, y0, x1, y1) {
        const dx = Math.abs(x1 - x0);
        const dy = Math.abs(y1 - y0);
        const sx = (x0 < x1) ? 1 : -1;
        const sy = (y0 < y1) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.drawPixel(x0, y0);

            if ((x0 === x1) && (y0 === y1)) break;
            const e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x0 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y0 += sy;
            }
        }
    }
}

export { Circulo };
