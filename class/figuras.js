class Figura {
    constructor(ctx, color, grosor) {
        this.ctx = ctx;
        this.color = color;
        this.grosor = grosor;
        // Arreglo de puntos
        this.puntos = [];
        // Crear un canvas temporal reutilizable
        this.tempCanvas = document.createElement('canvas');
        this.tempCtx = this.tempCanvas.getContext('2d');
        this.tempCanvas.width = 1 + grosor;
        this.tempCanvas.height = 1 + grosor;
    }

    // Dibujar la figura (método abstracto)
    draw() {
        // Implementar en las clases hijas
    }

    // Pintar un punto
    drawPixel(x, y) {
        var halfThickness = Math.floor(this.grosor / 2);
        
        // Dibujar el pixel en el canvas temporal
        this.tempCtx.fillStyle = this.color;
        this.tempCtx.fillRect(0, 0, 1 + halfThickness * 2, 1 + halfThickness * 2);
        
        // Pegar el pixel en el canvas principal
        this.ctx.drawImage(this.tempCanvas, x - halfThickness, y - halfThickness);
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
