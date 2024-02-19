//Clase para las figuras del canvas

class Figura {
    constructor(ctx, color, grosor) {
        this.ctx = ctx;
        this.color = color;
        this.grosor = grosor;
        //Arreglo de puntos
        this.puntos = [];
    }

    // Dibujar la figura
    draw() {
        // Implementar en las clases hijas
    }

    // Pintar un punto
    drawPixel(x, y) {
        var halfThickness = Math.floor(this.grosor / 2);

        for (var i = -halfThickness; i <= halfThickness; i++) {
            for (var j = -halfThickness; j <= halfThickness; j++) {
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(x + i, y + j, 1, 1);
            }
        }
    }

    setContext(newContext) {
        this.ctx = newContext;
    }
    
    setColor(newColor) {
        this.color = newColor;
    }
    
    setGrosor(newGrosor) {
        this.grosor = newGrosor;
    }
    
    borrarPixel(x,y) {
        var halfThickness = Math.floor(this.grosor / 2);

        for (var i = -halfThickness; i <= halfThickness; i++) {
            for (var j = -halfThickness; j <= halfThickness; j++) {
                //borrar el pixel
                this.ctx.clearRect(x + i, y + j, 1, 1);

            }
        }
    }

    
}

export { Figura };