import { CanvasManager } from "./class/canvasManager.js";

var startPoint;
var endPoint;
var ctx;

document.addEventListener("DOMContentLoaded", function () {
    const canvasManager = new CanvasManager();
    // Agrega un log para verificar que la instancia se haya creado correctamente
    console.log(canvasManager);
    console.log(canvasManager.getCurrentCanvas());
    canvasManager.setDrawing(false);
    //Modificar el style de los canvas que no son el actual y ocultarlos
    //************************MODOS***********************/
    //Cambiar el modo de dibujo
    document.getElementById("line").onclick = function () {
        canvasManager.cambiarModo('linea');
    };
    document.getElementById("grid").onclick = function () {
        canvasManager.activarGrid();
    };
    document.getElementById("square").onclick = function () {
        canvasManager.cambiarModo('cuadrado');
    };
    document.getElementById("circle").onclick = function () {
        canvasManager.cambiarModo('circulo');
    };
    document.getElementById("eraser").onclick = function () {
        canvasManager.cambiarModo('borrar');
    };
    document.getElementById("pencil").onclick = function () {
        canvasManager.cambiarModo('lapiz');
    };
    document.getElementById("bucket").onclick = function () {
        canvasManager.cambiarModo('cubeta');
    };
    document.getElementById("polygon").onclick = function () {
        canvasManager.cambiarModo('poligono');
        //Salga un selector de numeros y dependiendo del numero seleciconado ejecutar setLadosPoligono
        var lados = prompt("Ingrese el numero de lados del poligono");
        canvasManager.setLadosPoligono(lados);
    };
    document.getElementById("elipse").onclick = function () {
        canvasManager.cambiarModo('elipse');
    }
    document.getElementById("colorPicker").onchange = function () {
        canvasManager.cambiarColor(this.value);
    };      
    document.getElementById("grosor").onchange = function () {
        canvasManager.cambiarGrosor(this.value);
    };
    //GRID
    document.getElementById("gridCanvas").onclick = function () {
        if (canvasManager.getGridEnabled()) {
            canvasManager.setGridEnabled(false);
        }
        else {
            canvasManager.setGridEnabled(true);
        }
    };
    //Selector de canvas
    document.getElementById("layer1").onclick = function () {
        canvasManager.setCurrentCanvas("layer1Canvas");
    };
    document.getElementById("layer2").onclick = function () {
        canvasManager.setCurrentCanvas("layer2Canvas");
    };
    document.getElementById("layer3").onclick = function () {
        canvasManager.setCurrentCanvas("layer3Canvas");
    };
    //***********************EVENTOS***********************/
    // Agrega un event listener para el evento de clic en el canvas
    canvasManager.getCurrentCanvas().addEventListener("mousedown", function (event) {
        ctx = canvasManager.getCurrentCanvasContext()

        // Configurar el estado de dibujo y el punto de inicio
        canvasManager.setDrawing(true);
        startPoint = canvasManager.getRelativeCoordinates(event);

        if(canvasManager.getCurrentModo() === 'cubeta'){
            canvasManager.fillCubeta(startPoint);
        }
  
    });
    //ARRASTRAR Y SOLTAR
    canvasManager.getCurrentCanvas().addEventListener("mousemove", function (event) {
        if (canvasManager.getDrawing()) {
            // Actualiza el punto final mientras se arrastra el ratón
            endPoint = canvasManager.getRelativeCoordinates(event);
            // console.log(endPoint)
            // Borra el canvas y vuelve a dibujar la línea actualizada
            ctx = canvasManager.getCurrentCanvasContext()
            if(canvasManager.getCurrentModo() === 'linea'){
                //limpiar el canvas solo entre los puntos de la linea
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawLine(startPoint, endPoint);
                // canvasManager.cleanLine(startPoint, endPoint);
            }
            else if(canvasManager.getCurrentModo() === 'cuadrado'){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawSquare(startPoint, endPoint);
            }
            else if(canvasManager.getCurrentModo() === 'borrar'){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            else if(canvasManager.getCurrentModo() === 'lapiz'){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawPixel(endPoint);
            }
            else if (canvasManager.getCurrentModo() === 'circulo'){
                // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawCircle(startPoint, endPoint);
            }
            else if (canvasManager.getCurrentModo() === 'poligono'){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawPolygon(startPoint, endPoint);
            }
            else if (canvasManager.getCurrentModo() === 'elipse'){
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                canvasManager.drawElips(startPoint, endPoint);
            }

        }
    });
    // Agrega event listener para el evento de mouseup
    canvasManager.getCurrentCanvas().addEventListener("mouseup", function () {
        // console.log("mouseup");
        canvasManager.setDrawing(false);
    });

    // Agrega event listener para el evento de mouseout
    canvasManager.getCurrentCanvas().addEventListener("mouseout", function () {
        console.log("mouseout");
        console.log(canvasManager.getDrawing());
        canvasManager.setDrawing(false);
    });

});
