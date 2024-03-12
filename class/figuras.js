class Figura {
    constructor(ctx, color, grosor) {
        this.ctx = ctx;
        this.color = color;
        this.grosor = grosor;
        this.puntos = [];
        this.puntosInternos = [];
        this.isfiller = false;
        this.colorfill = null;
    }

    // Dibujar la figura (método abstracto)
    draw() {
        // Implementar en las clases hijas
    }

    drawPixel(x, y) {
        var imageData = this.ctx.createImageData(1, 1); // Crea una nueva imagen de 1x1 píxel
    
        // Obtiene los valores RGBA del color
        var hex = this.color.replace('#', '');
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
    
        // Establece los valores RGBA en la imagen
        imageData.data[0] = r;
        imageData.data[1] = g;
        imageData.data[2] = b;
        imageData.data[3] = 255; // Opacidad al 100%
    
        // Dibuja la imagen en el lienzo
        this.ctx.putImageData(imageData, x, y);
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
