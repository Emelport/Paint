import {Figura} from "../class/figuras.js";
import {Linea} from "../class/linea.js";
import {Cuadrado} from "../class/cuadrado.js";

class CanvasManager {
    constructor() {
        // Obtener contextos de las capas
        this.gridCtx = document.getElementById("gridCanvas").getContext("2d");
        this.layer1Ctx = document.getElementById("layer1Canvas").getContext("2d");
        this.layer2Ctx = document.getElementById("layer2Canvas").getContext("2d");
        this.layer3Ctx = document.getElementById("layer3Canvas").getContext("2d");

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


    }



    setupCanvas() {

        //Tamano de los canvas

        this.gridCtx.canvas.width = 1024;
        this.gridCtx.canvas.height = 768;
        this.layer1Ctx.canvas.width = 1024;
        this.layer1Ctx.canvas.height = 768;
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
    }

    drawSquare(start, end) {

        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const cuadrado = new Cuadrado(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        cuadrado.draw();
    }

    cleanLine(start, end) {
        // Obtener el contexto del canvas actual
        const ctx = this.getCurrentCanvasContext();
        // Crear una instancia de la clase Linea (o tu clase correspondiente)
        const linea = new Linea(ctx, this.color, this.grosor, start, end);
        // Llamar al método draw de la instancia Linea
        linea.cleanLine(start, end);
    }
}

// Exportar la clase
export { CanvasManager };