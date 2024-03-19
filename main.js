import { CanvasManager } from "./class/canvasManager.js";

var startPoint;
var endPoint;
var ctx;

document.addEventListener("DOMContentLoaded", function () {
    const canvasManager = new CanvasManager();
    // Agrega un log para verificar que la instancia se haya creado correctamente
    console.log(canvasManager.getCurrentCanvas());
    canvasManager.setDrawing(false);
    //Modificar el style de los canvas que no son el actual y ocultarlos
    //************************MODOS***********************/
    //Cambiar el modo de dibujo
    document.getElementById("cursor").onclick = function () {
        canvasManager.cambiarModo('cursor');
    };
    document.getElementById("line").onclick = function () {
        canvasManager.cambiarModo('linea');
    };
    document.getElementById("grid").onclick = function () {
        canvasManager.activarGrid();
    };
    document.getElementById("square").onclick = function () {
        canvasManager.cambiarModo('cuadrado');
    };
    document.getElementById("text").onclick = function () {
        canvasManager.cambiarModo('texto');
    };
    document.getElementById("rectangle").onclick = function () {
        canvasManager.cambiarModo('rectangulo');
    };
    document.getElementById("circle").onclick = function () {
        canvasManager.cambiarModo('circulo');
    };
    document.getElementById("trapecio").onclick = function () {
        canvasManager.cambiarModo('trapecio');
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
    document.getElementById("lineTest").onclick = function () {
        canvasManager.lineTest();
    }
    document.getElementById("polygon").onclick = function () {
        canvasManager.cambiarModo('poligono');
        //Salga un selector de numeros y dependiendo del numero seleciconado ejecutar setLadosPoligono
        var lados = prompt("Ingrese el numero de lados del poligono");
        canvasManager.setLadosPoligono(lados);
    };3
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
    // document.getElementById("gridCanvas").onclick = function () {
    //     if (canvasManager.getGridEnabled()) {
    //         canvasManager.setGridEnabled(false);
    //     }
    //     else {
    //         canvasManager.setGridEnabled(true);
    //     }
    // };
    //Selector de canvas
    // document.getElementById("layer1").onclick = function () {
    //     canvasManager.setCurrentCanvas("layer1Canvas");
    // };
    // document.getElementById("layer2").onclick = function () {
    //     canvasManager.setCurrentCanvas("layer2Canvas");
    // };
    // document.getElementById("layer3").onclick = function () {
    //     canvasManager.setCurrentCanvas("layer3Canvas");
    // };

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
        var coordenadas = canvasManager.getRelativeCoordinates(event);
        //Coordenadas a 2 decimales
        document.getElementById("coordenadas").innerHTML = "X: " + coordenadas.x.toFixed(2) + " Y: " + coordenadas.y.toFixed(2);
   
        if (canvasManager.getDrawing()) {
            // Actualiza el punto final mientras se arrastra el ratón
            endPoint = canvasManager.getRelativeCoordinates(event);
            // console.log(endPoint)
            // Borra el canvas y vuelve a dibujar la línea actualizada
            ctx = canvasManager.getCurrentCanvasContext()
            const modo = canvasManager.getCurrentModo();

            //Si entra a cualquier modo de dibujo
            if (modo === 'linea' || modo === 'cuadrado' || modo === 'borrar' || modo === 'lapiz' || modo === 'circulo' || modo === 'poligono' || modo === 'elipse' || modo === 'trapecio' || modo === 'rectangulo' || modo === 'cubeta' || modo === 'texto') {
                canvasManager.drawPreview(startPoint, endPoint);
            }
        }
    });
    // Agrega event listener para el evento de mouseup
    canvasManager.getCurrentCanvas().addEventListener("mouseup", function () {
        // console.log("mouseup");
        const modo = canvasManager.getCurrentModo();

        //Si entra a cualquier modo de dibujo
        if (modo === 'linea' || modo === 'cuadrado' || modo === 'borrar' || modo === 'lapiz' || modo === 'circulo' || modo === 'poligono' || modo === 'elipse' || modo === 'trapecio' || modo === 'rectangulo' || modo === 'cubeta' || modo === 'texto') {
            canvasManager.draw(startPoint, endPoint);
        }else if (modo === 'cursor') {
            canvasManager.selectElement(startPoint);
        }
        canvasManager.setDrawing(false);
    });
    // Agrega event listener para el evento de mouseout
    canvasManager.getCurrentCanvas().addEventListener("mouseout", function () {
        // console.log("mouseout");
        // console.log(canvasManager.getDrawing());
        canvasManager.setDrawing(false);
    });
    //***************************BOTONES ****************/
   
    // <div class="undoRedo">
    //     <button id="undo">Deshacer</button>
    //     <button id="redo">Rehacer</button>
    //     <button id="lineTest">Test Lineas</button>
    // </div>

    // Agrega un event listener para el botón de deshacer
    document.getElementById("undo").onclick = function () {
        canvasManager.history.undo(canvasManager.getCurrentCanvasContext());
    };
    // Agrega un event listener para el botón de rehacer
    document.getElementById("redo").onclick = function () {
        canvasManager.history.redo(canvasManager.getCurrentCanvasContext());
    };
    //Cuando se de click en las flechas del teclado trasladar la figura, recibe dx y dy canvasManager.figuraSeleccionada.trasladarFigura
    document.addEventListener('keydown', function (event) {
        if (canvasManager.figuraSeleccionada != null) {
            if (event.key === "ArrowUp") {
                canvasManager.figuraSeleccionada.trasladarFigura(0, -1);
            }
            if (event.key === "ArrowDown") {
                canvasManager.figuraSeleccionada.trasladarFigura(0, 1);
            }
            if (event.key === "ArrowLeft") {
                canvasManager.figuraSeleccionada.trasladarFigura(-1, 0);
            }
            if (event.key === "ArrowRight") {
                canvasManager.figuraSeleccionada.trasladarFigura(1, 0);
            }
        }

        canvasManager.history.renderizar(canvasManager.getCurrentCanvasContext());

    });


    //*************************** Estados **************
    
});
