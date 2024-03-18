class Figura {
    constructor(ctx, color, grosor) {
        this.ctx = ctx;
        this.color = color;
        this.grosor = grosor;
        this.puntos = [];
        this.puntosInternos = [];
        this.estaRellena = false;
        this.colorRelleno = null;
    }

    // Dibujar la figura (método abstracto)
    draw() {
        // Implementar en las clases hijas
    }
    drawPixel(x, y) {
        // Obtener el contexto del lienzo
        const ctx = this.ctx;
    
        // Obtener el color y el grosor
        const color = this.color;
        const grosor = this.grosor;
    
        // Guardar el estado actual del contexto
        ctx.save();
    
        // Ajustar el canal alfa del color para que sea el más bajo posible (0)
        const colorWithAlpha = color.replace(/[^,]+(?=\))/, '0');
    
        // Establecer el color de relleno
        ctx.fillStyle = colorWithAlpha;
    
        // Dibujar un rectángulo de un solo píxel en la posición dada
        ctx.fillRect(x, y, grosor, grosor);
    
        // Restaurar el estado del contexto
        ctx.restore();
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
        this.estaRellena = true
        if (this.estaRellena){

            this.ctx = ctx

            if (targetColor == fillColor){
                console.log("Ya tiene ese color", targetColor,fillColor)
                this.estaRellena = false
                return
            }
            console.log(fillColor)
            this.color = fillColor
            //Dibujar todos los puntos internos
            this.puntosInternos.forEach(punto => {
                this.drawPixel(punto.x, punto.y);
            });
        }
    }
    isInside(point) {
        // Verificar si el punto está dentro de la figura considerando un margen de ±0.5
        for (let i = 0; i < this.puntosInternos.length; i++) {
            const deltaX = Math.abs(point.x - this.puntosInternos[i].x);
            const deltaY = Math.abs(point.y - this.puntosInternos[i].y);
            if (deltaX <= 0.5 && deltaY <= 0.5) {
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

    trasladarFigura(dx, dy) {
        // Trasladar la figura
        this.puntos = this.puntos.map(punto => {
            return { x: punto.x + dx, y: punto.y + dy };
        });
        this.puntosInternos = this.puntosInternos.map(punto => {
            return { x: punto.x + dx, y: punto.y + dy };
        });
    }
}

export { Figura };
