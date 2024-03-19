import {Figura} from "../class/figuras.js";
import {Linea} from "../class/linea.js";
import {Cuadrado} from "../class/cuadrado.js";
import {Circulo} from "../class/circulo.js";
import {Poligonos} from "../class/poligonos.js";   
import {Elipse} from "../class/elipse.js";
import {HistoryManager} from "../class/historyManager.js"
import { Trapecio } from "./trapecio.js";
import { Rectangulo } from "./rectangulo.js";
import { Texto } from "./texto.js";

class CanvasManager {
    constructor() {
        // Obtener contextos de las capas
        this.layer1Ctx = document.getElementById("layer1Canvas").getContext("2d", { willReadFrequently: true });
        this.layer2Ctx = document.getElementById("layer2Canvas").getContext("2d", { willReadFrequently: true });

        // Otras propiedades y configuraciones necesarias
        this.modo = "";
        this.color = "#000000";
        this.grosor = 1;
        this.drawing = false;
        this.gridEnabled = false;
        this.startPoint = null;
        this.endPoint = null;
        this.freePixels = [];
        this.currentCanvas = null;
        this.ladospoligono = 0;
        this.figuraSeleccionada = null;
        this.setupCanvas();
        this.setupListeners();

        this.history = new HistoryManager();
        this.figuras = [];
    }
    setupCanvas() {

        //Tamano de los canvas
        this.layer1Ctx.canvas.width = 1024;
        this.layer1Ctx.canvas.height = 768;
        this.layer2Ctx.canvas.width = 1024;
        this.layer2Ctx.canvas.height = 768;
        // El canvas actual es el layer1 por defecto
        this.setCurrentCanvas("layer2Canvas");

    }
    setupListeners() {
       //MouseDown
        document.addEventListener("mousedown", this.mouseDown);

    }
    setCurrentCanvas(canvasId) {
        // Establece el canvas actual en función del ID proporcionado
        this.currentCanvas = document.getElementById(canvasId);

        // console.log(this.currentCanvas);
    }
    setDrawing(newDrawing) {
        // Establece el estado del dibujo
        this.drawing = newDrawing;
    }
    setGridEnabled(newGridEnabled) {
        // Establece el estado del grid
        console.log(newGridEnabled);
        this.gridEnabled = newGridEnabled;
    }
    setLadosPoligono(newLados){
        this.ladospoligono = newLados;
        console.log(this.ladospoligono);
    }
    setModo(newModo){
        this.modo = newModo;
    }
    getCurrentModo(){
        return this.modo;
    }
    getGridEnabled() {
        // Devuelve el estado del grid
        return this.gridEnabled;
    }
    getCurrentCanvas() {
        // Devuelve el canvas actual
        return this.currentCanvas;
    }
    getDrawing() {
        // Devuelve el estado del dibujo
        return this.drawing;
    }
    getRelativeCoordinates(event) {
        // Obtiene las coordenadas relativas del evento en el canvas actual
    
        const rect = this.getCurrentCanvasContext().canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        // console.log(rect);

    }
    getCurrentCanvasContext() {
        //Obtener el context del canvas actual
        return this.currentCanvas.getContext("2d");
    }
    getCurrentLadospoligono(){
        return this.ladospoligono;
    }
    cambiarModo(newModo) {
        this.modo = newModo;
        console.log(this.modo);
        // Otras acciones relacionadas con cambiar el modo
    }
    cambiarColor(newColor) {
        this.color = newColor;
        console.log(this.color + " color");
        // Configurar el color cada vez que cambias el color
        // ...
    }
    cambiarGrosor(newGrosor) {
        this.grosor = newGrosor;
        console.log(this.grosor);
        // Configurar el grosor cada vez que cambias el grosor
        // ...
    }
    activarGrid() {
        this.gridEnabled = !this.gridEnabled;
        this.drawGrid();
        console.log(this.gridEnabled);
        // Otras acciones relacionadas con activar o desactivar el grid
    }
    drawGrid() {
        // Implementar lógica para dibujar el grid
        // ...
    }
    drawLine(start, end) {
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const linea = new Linea(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        linea.draw(start, end);
        return linea;
    }
    drawSquare(start, end) {

        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const cuadrado = new Cuadrado(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        cuadrado.draw();
        return cuadrado;
    }
    drawText(start, end) {
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const texto = new Texto(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        texto.draw();
        return texto;
    }

    drawRectangle(start, end) {

        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const rectangulo = new Rectangulo(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        rectangulo.draw();
        return rectangulo;
    }
    drawCircle(start,end){
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        const circulo = new Circulo(ctx, this.color, this.grosor, start, end);
        circulo.draw();
        return circulo;
    }
    drawPolygon(start,end){
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        const line = this.getCurrentLadospoligono();
        // console.log(ctx, this.color, this.grosor, start, end, line)
        const poligonos = new Poligonos(ctx, this.color, this.grosor, start, end, line);
        poligonos.draw();
        return poligonos;
    }
    drawElips(start,end){
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        const elipse = new Elipse(ctx, this.color, this.grosor, start, end);
        elipse.draw();
        return elipse;
    }
    drawPixel(point) {
        console.log("Dibujando pixel");
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        
        this.freePixels.push(point);
        //Pintar el pixel
        // Obtener el color y el grosor
        const color = this.color;
        const grosor = this.grosor;
        const colorWithAlpha = color.replace(/[^,]+(?=\))/, '0');
        ctx.fillStyle = colorWithAlpha;
        ctx.fillRect(point.x, point.y, grosor, grosor);

    }
    drawTrapecio(start,end){
        const ctx = this.getCurrentCanvasContext();
        const trapecio = new Trapecio(ctx, this.color, this.grosor, start, end);
        trapecio.draw();
        return trapecio;
    }
    cleanLine(start, end) {
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const linea = new Linea(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        linea.cleanLine(start, end);
    }
    fillCubeta(start) {
        console.log("Rellenando");
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        const targetColor = null
        //Recorrer el arreglo de figuras desde el ultimo agregado hacia atras para ver si pertenece a esa figura utilizando el isinside
        let figuraSeleccionada = this.history.seleccionarFigura(ctx,start);
        if (figuraSeleccionada){
            console.log("Figura seleccionada", figuraSeleccionada);
            figuraSeleccionada.rellenar(ctx,targetColor,this.color)
        }
        else {
            console.log("No hay figura seleccionada")
            console.log(start.x, start.y)

        }
        this.history.renderizar(ctx);
    }  
    floodFill(ctx,startX, startY, targetColor, fillColor) {
        if (targetColor.toString() === fillColor.toString()) {
            console.log("El pixel de inicio ya es del color de relleno deseado.");
            return;
        }
    
        var stack = [[startX, startY]];
        var imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        var pixels = imageData.data;
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;

        var getColorIndex = function(x, y) {
            return (y * width + x) * 4;
        };

        var isSameColor = function(pixelPos) {
            return (
                pixels[pixelPos] === targetColor[0] &&
                pixels[pixelPos + 1] === targetColor[1] &&
                pixels[pixelPos + 2] === targetColor[2] &&
                pixels[pixelPos + 3] === targetColor[3]
            );
        };

        var setColor = function(pixelPos) {
            pixels[pixelPos] = fillColor[0];
            pixels[pixelPos + 1] = fillColor[1];
            pixels[pixelPos + 2] = fillColor[2];
            pixels[pixelPos + 3] = fillColor[3];
        };

        while (stack.length) {
            var newPos, x, y, pixelPos, reachLeft, reachRight;

            newPos = stack.pop();
            x = newPos[0];
            y = newPos[1];

            pixelPos = getColorIndex(x, y);

            while (y-- >= 0 && isSameColor(pixelPos)) {
                pixelPos -= width * 4;
            }
            pixelPos += width * 4;

            reachLeft = false;
            reachRight = false;

            while (y++ < height - 1 && isSameColor(pixelPos)) {
                setColor(pixelPos);

                if (x > 0) {
                    if (isSameColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            stack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < width - 1) {
                    if (isSameColor(pixelPos + 4)) {
                        if (!reachRight) {
                            stack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += width * 4;
            }
        }
        this.history.addActionToHistory(imageData, "fill");
        ctx.putImageData(imageData, 0, 0);
    }
    hexToRgb(hex) {
        //Recibe un color en formato hexadecimal y lo convierte a RGB
        //Ejemplo: #FFFFFF -> [255, 255, 255, 255]
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16),
            255
        ] : null;
    }
    drawPreview(start, end) {
        // Obtener el contexto del canvas actual
        this.setCurrentCanvas("layer2Canvas");  
        const ctx = this.getCurrentCanvasContext();
        // // Limpiar el canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Dibujar la figura correspondiente
        if (this.modo === "linea") {
            this.drawLine(start, end);
        } else if (this.modo === "cuadrado") {
            this.drawSquare(start, end);
        } else if (this.modo === "texto") {
            this.drawRectangle(start, end);
        } else if (this.modo === "rectangulo") {
            this.drawRectangle(start, end);
        } else if (this.modo === "circulo") {
            this.drawCircle(start, end);
        } else if (this.modo    === "poligono") {
            this.drawPolygon(start, end);
        } else if (this.modo === "elipse") {
            this.drawElips(start, end);
        }
        else if (this.modo === "trapecio") {
            this.drawTrapecio(start, end);
        }
        else if (this.modo === "lapiz") {
           this.drawPixel(start);
        }

        // this.history.renderizar(this.getCurrentCanvasContext(),1);

    }   

    draw(start, end) {
        this.setCurrentCanvas("layer1Canvas");
        const ctx = this.getCurrentCanvasContext();

        if (this.modo === "linea") {
            const line = this.drawLine(start, end);
            this.figuras.push(line);
            this.history.addActionToHistory(line, "figure");

        } else if (this.modo === "cuadrado") {
            const square = this.drawSquare(start, end);
            this.figuras.push(square);
            this.history.addActionToHistory(square, "figure");
        } else if (this.modo === "texto") {
            const text = this.drawText(start, end);
            this.figuras.push(text);
            this.history.addActionToHistory(text, "figure");
            
        } else if (this.modo === "rectangulo") {
            const rectangle = this.drawRectangle(start, end);
            this.figuras.push(rectangle);
            this.history.addActionToHistory(rectangle, "figure");
        } else if (this.modo === "circulo") {
            const circle = this.drawCircle(start, end);
            this.figuras.push(circle);
            this.history.addActionToHistory(circle, "figure");
        } else if (this.modo === "poligono") {
            const poligonos = this.drawPolygon(start, end);
            this.figuras.push(poligonos);
            this.history.addActionToHistory(poligonos, "figure");

        } else if (this.modo === "elipse") {
            const elipse = this.drawElips(start, end);
            this.figuras.push(elipse);
            this.history.addActionToHistory(elipse, "figure");
        }
        else if (this.modo === "trapecio") {
            const trapecio = this.drawTrapecio(start, end);
            this.figuras.push(trapecio);
            this.history.addActionToHistory(trapecio, "figure");
        }
        else if (this.modo === "lapiz") {
            //guardar el dibujo libre en history action, creando una nueva figura
            const F = new Figura(ctx, this.color, this.grosor);
            F.puntos = this.freePixels;
            console.log(F);
            this.history.addActionToHistory(F, "figure");
            this.freePixels = [];

        }
        else if (this.modo === "borrar") {
            const ctx = this.getCurrentCanvasContext();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
            this.layer2Ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.figuras = [];
            this.history.undoStack = [];
            this.history.redoStack = [];
        }

        this.history.renderizar(this.getCurrentCanvasContext());

    
    }

    lineTest(){
        console.log("empezando test");
        const ctx = this.getCurrentCanvasContext();
        const linea = new Linea(ctx);
        linea.testRendimiento();
        // linea.testRendimiento2();
        // linea.testRendimiento3();
    }
    getColorAtPixel(x, y) {
        var imageData = ctx.getImageData(x, y, 1, 1);
        var data = imageData.data;
        return [data[0], data[1], data[2], data[3]]; // RGBA
    }
    selectElement(start){
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        //Recorrer el arreglo de figuras desde el ultimo agregado hacia atras para ver si pertenece a esa figura utilizando el isinside
        let figuraSeleccionada = this.history.seleccionarFigura(ctx,start);
        // console.log(figuraSeleccionada);
        this.figuraSeleccionada = figuraSeleccionada;

    }
}

// Exportar la clase
export { CanvasManager };