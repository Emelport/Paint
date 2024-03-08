class Figura {
    constructor(ctx, color, grosor) {
        this.ctx = ctx;
        this.color = color;
        this.grosor = grosor;
        // Arreglo de puntos
        this.puntos = [];
        this.puntosInternos = [];
        // Crear un canvas temporal reutilizable

    }

    // Dibujar la figura (método abstracto)
    draw() {
        // Implementar en las clases hijas
    }

    // Pintar un punto
    drawPixel(x, y) {
        var halfThickness = Math.floor(this.grosor / 2);
        
        // Dibujar cada pixel 
        for (var i = -halfThickness; i <= halfThickness; i++) {
            for (var j = -halfThickness; j <= halfThickness; j++) {
                // Pintar el pixel
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(x + i, y + j, 1, 1);
            }
        }
    }

    // Verificar si un punto está dentro de la figura (método abstracto)
    isInside(start) {
        // Implementar en las clases hijas
    }

    // Establecer el contexto de dibujo
    setContext(newContext) {
        this.ctx = newContext;
    }

    // Establecer el color de la figura
    setColor(newColor) {
        this.color = newColor;
    }

    rellenar(ctx,targetColor,fillColor){
        this.ctx = ctx

        if (targetColor == fillColor){
            console.log("Ya tiene ese color", targetColor,fillColor)
            return

        }
        console.log(fillColor)
        this.color = fillColor
        //Dibujar todos los puntos internos
        this.puntosInternos.forEach(punto => {
            this.drawPixel(punto.x, punto.y);
        });
    }

    isInside(point) {
        for (let i = 0; i < this.puntosInternos.length; i++) {
            if (point.x === this.puntosInternos[i].x && point.y === this.puntosInternos[i].y) {
                return true;
            }
        }
        return false;
    }
    


    // Establecer el grosor del trazo
    setGrosor(newGrosor) {
        this.grosor = newGrosor;
    }

    // Borrar un píxel en las coordenadas especificadas
    borrarPixel(x, y) {
        var halfThickness = Math.floor(this.grosor / 2);

        for (var i = -halfThickness; i <= halfThickness; i++) {
            for (var j = -halfThickness; j <= halfThickness; j++) {
                // Borrar el pixel
                this.ctx.clearRect(x + i, y + j, 1, 1);
            }
        }
    }
}

export { Figura };
