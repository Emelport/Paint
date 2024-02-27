import {Figura} from "../class/figuras.js";
import {Linea} from "../class/linea.js";
import {Cuadrado} from "../class/cuadrado.js";
import {Circulo} from "../class/circulo.js";
import {Poligonos} from "../class/poligonos.js";   
import {Elipse} from "../class/elipse.js";

class CanvasManager {
    constructor() {
        // Obtener contextos de las capas
        this.gridCtx = document.getElementById("gridCanvas").getContext("2d", { willReadFrequently: true });
        this.layer1Ctx = document.getElementById("layer1Canvas").getContext("2d", { willReadFrequently: true });
        this.layer2Ctx = document.getElementById("layer2Canvas").getContext("2d", { willReadFrequently: true });
        this.layer3Ctx = document.getElementById("layer3Canvas").getContext("2d", { willReadFrequently: true });

        // Otras propiedades y configuraciones necesarias
        this.modo = "";
        this.color = "#000000";
        this.grosor = 1;
        this.drawing = false;
        this.gridEnabled = false;
        this.startPoint = null;
        this.endPoint = null;
        this.currentCanvas = null;
        this.setupCanvas();
        this.setupListeners();

        this.ladospoligono = 0;

        this.figuras = [];
    }


    setupCanvas() {

        //Tamano de los canvas

        this.gridCtx.canvas.width = 1024;
        this.gridCtx.canvas.height = 768;
        this.layer1Ctx.canvas.width = 1000;
        this.layer1Ctx.canvas.height = 1000;
        this.layer2Ctx.canvas.width = 1024;
        this.layer2Ctx.canvas.height = 768;
        this.layer3Ctx.canvas.width = 1024;
        this.layer3Ctx.canvas.height = 768;
        
        // El canvas actual es el layer1 por defecto
        this.setCurrentCanvas("layer1Canvas");
        //Ocultar el grid por defecto
        document.getElementById("gridCanvas").style.display = "none";
    }
    setupListeners() {
       //MouseDown
        document.addEventListener("mousedown", this.mouseDown);

    }
    setCurrentCanvas(canvasId) {
        // Establece el canvas actual en función del ID proporcionado
        this.currentCanvas = document.getElementById(canvasId);
        //ocultar los otros canvas
        if (canvasId === "layer1Canvas") {
            document.getElementById("layer2Canvas").style.display = "none";
            document.getElementById("layer3Canvas").style.display = "none";
        } else if (canvasId === "layer2Canvas") {
            document.getElementById("layer1Canvas").style.display = "none";
            document.getElementById("layer3Canvas").style.display = "none";
        }
        else if (canvasId === "layer3Canvas") {
            document.getElementById("layer1Canvas").style.display = "none";
            document.getElementById("layer2Canvas").style.display = "none";
        }
        //mostrar el canvas seleccionado
        this.currentCanvas.style.display = "block";

        console.log(this.currentCanvas);
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
        if (this.currentCanvas) {
            const rect = this.currentCanvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
           
        } else {
            console.error("No hay un canvas seleccionado.");
            return null;
        }

       
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
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear un objeto de tipo Figura (o tu clase correspondiente)
        const figura = new Figura(ctx, this.color, this.grosor);
        // Llamar al método drawPixel del objeto Figura
        figura.drawPixel(point.x, point.y);
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
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Obtener el color del punto de inicio
        const startColor = ctx.getImageData(start.x, start.y, 1, 1).data;
        // Obtener el color seleccionado actual
        const targetColor = this.color;
        // Verificar si el color de inicio es igual al color seleccionado
        if (startColor[0] === targetColor[0] && startColor[1] === targetColor[1] && startColor[2] === targetColor[2] && startColor[3] === targetColor[3]) {
            // Si el color de inicio ya es igual al color seleccionado, no hace falta rellenar
            return;
        }
        // Llamar al método recursivo para rellenar el área
        this.floodFill(ctx, start.x, start.y, startColor, targetColor);
    }  
    floodFill(ctx, x, y, startColor, targetColor) {
        // Crear una pila para almacenar los píxeles que deben ser llenados
        const stack = [];
        // Empujar el punto de inicio a la pila
        stack.push([x, y]);
    
        // Mientras la pila no esté vacía
        while (stack.length > 0) {
            // Sacar el último punto de la pila
            const [currentX, currentY] = stack.pop();
    
            // Obtener el color del píxel actual
            const pixelColor = ctx.getImageData(currentX, currentY, 1, 1).data;
    
            // Verificar si el color del píxel es igual al color de inicio
            if (this.colorsMatch(pixelColor, startColor)) {
                // Cambiar el color del píxel al color objetivo
                ctx.fillStyle = this.color;
                ctx.fillRect(currentX, currentY, 1, 1);
    
                // Empujar los píxeles adyacentes a la pila si no han sido procesados antes
                this.pushIfValid(stack, ctx, currentX + 1, currentY, startColor);
                this.pushIfValid(stack, ctx, currentX - 1, currentY, startColor);
                this.pushIfValid(stack, ctx, currentX, currentY + 1, startColor);
                this.pushIfValid(stack, ctx, currentX, currentY - 1, startColor);
            }
        }
    }
    
    colorsMatch(color1, color2) {
        // Verificar si dos colores son iguales
        return color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
    }
    
    pushIfValid(stack, ctx, x, y, startColor) {
        // Verificar si las coordenadas están dentro del canvas
        if (x >= 0 && x < ctx.canvas.width && y >= 0 && y < ctx.canvas.height) {
            // Verificar si el color del píxel es igual al color de inicio
            const pixelColor = ctx.getImageData(x, y, 1, 1).data;
            if (this.colorsMatch(pixelColor, startColor)) {
                // Empujar las coordenadas a la pila si el color coincide
                stack.push([x, y]);
            }
        }
    }

    drawPreview(start, end) {
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // // Limpiar el canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Dibujar la figura correspondiente
        if (this.modo === "linea") {
            const line = this.drawLine(start, end);
            this.renderizarFiguras();
        } else if (this.modo === "cuadrado") {
            const square = this.drawSquare(start, end);
            this.renderizarFiguras();   
        } else if (this.modo === "circulo") {
            const circle = this.drawCircle(start, end);
            this.renderizarFiguras();

        } else if (this.modo    === "poligono") {
            const poligonos = this.drawPolygon(start, end);
            this.renderizarFiguras();
        } else if (this.modo === "elipse") {
            const elipse = this.drawElips(start, end);
            this.renderizarFiguras();
        }
        else if (this.modo === "lapiz") {
            const F = new Figura(ctx, this.color, this.grosor);
            F.drawPixel(end);
            this.renderizarFiguras();
        }




    }

    draw(start, end) {

        if (this.modo === "linea") {
            const line = this.drawLine(start, end);
            this.figuras.push(line);

        } else if (this.modo === "cuadrado") {
            const square = this.drawSquare(start, end);
            this.figuras.push(square);
        } else if (this.modo === "circulo") {
            const circle = this.drawCircle(start, end);
            this.figuras.push(circle);
        } else if (this.modo === "poligono") {
            const poligonos = this.drawPolygon(start, end);
            this.figuras.push(poligonos);
        } else if (this.modo === "elipse") {
            const elipse = this.drawElips(start, end);
            this.figuras.push(elipse);
        }
        else if (this.modo === "lapiz") {
            const F = new Figura(ctx, this.color, this.grosor);
            F.drawPixel(end);
        }
        else if (this.modo === "borrar") {
            const ctx = this.getCurrentCanvasContext();
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
            this.figuras = [];
        }
    
    }

    renderizarFiguras(){
        const figurasrender = this.figuras;
        this.figuras.forEach(figura => {
            figura.draw();
        });
        this.figuras = figurasrender;
    }
    
    lineTest(){
        console.log("empezando test");
        const ctx = this.getCurrentCanvasContext();
        const linea = new Linea(ctx);
        linea.testRendimiento();
        // linea.testRendimiento2();
        // linea.testRendimiento3();
    }
    
}

// Exportar la clase
export { CanvasManager };