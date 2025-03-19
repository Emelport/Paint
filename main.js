import { CanvasManager } from "./class/canvasManager.js";

let startPoint;
let endPoint;
let ctx;

document.addEventListener("DOMContentLoaded", () => {
    const canvasManager = new CanvasManager();

    canvasManager.setDrawing(false);
    ctx = canvasManager.getCurrentCanvasContext();

    // Modo de dibujo
    const modes = {
        cursor: 'cursor',
        line: 'linea',
        grid: 'grid',
        square: 'cuadrado',
        text: 'texto',
        rectangle: 'rectangulo',
        circle: 'circulo',
        move: 'mover',
        rotation: 'rotar',
        resize: 'escalar',
        forward: 'HaciaAdelante',
        backward: 'HaciaAtras',
        uplayer: 'SubirCapa',
        downlayer: 'BajarCapa',
        eraser: 'borrar',
        figureEraser: 'borrarFigura',
        pixelEraser: 'pixelEraser',
        pencil: 'lapiz',
        bucket: 'cubeta',
        polygon: 'poligono',
        ellipse: 'elipse',
        trapezoid: 'trapecio'
    };

    // Función para cambiar el modo
    function setMode(mode) {
        canvasManager.cambiarModo(mode);

        if (mode === modes.polygon) {
            const lados = prompt("Ingrese el número de lados del polígono");
            canvasManager.setLadosPoligono(lados);
        }
    }

    Object.keys(modes).forEach((mode) => {
        document.getElementById(mode)?.addEventListener('click', () => setMode(modes[mode]));
    });

    // Configuración de color y grosor
    document.getElementById("colorPicker").addEventListener("change", (e) => {
        canvasManager.cambiarColor(e.target.value);
    });

    document.getElementById("grosor").addEventListener("change", (e) => {
        canvasManager.cambiarGrosor(e.target.value);
    });

    // Eventos de ratón para el canvas
    const canvas = canvasManager.getCurrentCanvas();

    canvas.addEventListener("mousedown", (event) => {
        startPoint = canvasManager.getRelativeCoordinates(event);
        canvasManager.setDrawing(true);

        if (canvasManager.getCurrentModo() === modes.bucket) {
            canvasManager.fillCubeta(startPoint);
        }
    });



    canvas.addEventListener("mousemove", (event) => {
        const coords = canvasManager.getRelativeCoordinates(event);
        document.getElementById("coordenadas").innerText = `X: ${coords.x.toFixed(2)} Y: ${coords.y.toFixed(2)}`;

        if (canvasManager.getDrawing()) {
            endPoint = coords;

            const modo = canvasManager.getCurrentModo();
            if ([
                modes.line,
                modes.square,
                modes.eraser,
                modes.circle,
                modes.polygon,
                modes.ellipse,
                modes.trapezoid,
                modes.rectangle,
                modes.bucket,
                modes.text
            ].includes(modo)) {
                canvasManager.drawPreview(startPoint, endPoint);
            } else if ([modes.pencil, modes.pixelEraser].includes(modo)) {
                canvasManager.drawPreview(startPoint, endPoint);
                startPoint = endPoint;
            }
        }
    });

    canvas.addEventListener("mouseup", () => {
        const modo = canvasManager.getCurrentModo();

        if ([
            modes.line,
            modes.square,
            modes.eraser,
            modes.circle,
            modes.polygon,
            modes.ellipse,
            modes.trapezoid,
            modes.rectangle,
            modes.bucket,
            modes.text,
            modes.pixelEraser,
            modes.pencil
        ].includes(modo)) {
            canvasManager.draw(startPoint, endPoint);
        } else if (modo === modes.cursor) {
            canvasManager.selectElement(startPoint);
        } else if ([
            modes.move,
            modes.rotation,
            modes.forward,
            modes.backward,
            modes.uplayer,
            modes.downlayer,
            modes.resize,
            modes.figureEraser
        ].includes(modo)) {
            canvasManager.limpiarCanvas();
            canvasManager.moverFigura(startPoint, endPoint);
        }

        canvasManager.setDrawing(false);
    });

    canvas.addEventListener("mouseout", () => {
        canvasManager.setDrawing(false);
    });

    // Funciones de control de historial
    document.getElementById("undo").addEventListener("click", () => {
        canvasManager.limpiarCanvas();
        canvasManager.history.undo(ctx);
    });

    document.getElementById("redo").addEventListener("click", () => {
        canvasManager.limpiarCanvas();
        canvasManager.history.redo(ctx);
    });



    // Guardar, abrir y exportar
    document.getElementById("open").addEventListener("click", () => canvasManager.abrirArchivo());
    document.getElementById("save").addEventListener("click", () => canvasManager.guardarArchivo());
    document.getElementById("export").addEventListener("click", () => canvasManager.exportarArchivo());

    // Control de teclado
    let teclaPresionada = false;

    document.addEventListener("keyup", () => {
        teclaPresionada = false;
    });

    document.addEventListener("keydown", (event) => {
        if (!teclaPresionada) {
            teclaPresionada = true;
            if (canvasManager.figuraSeleccionada) {
                const desplazamientos = {
                    ArrowUp: [0, -1],
                    ArrowDown: [0, 1],
                    ArrowLeft: [-1, 0],
                    ArrowRight: [1, 0]
                };

                if (desplazamientos[event.key]) {
                    canvasManager.figuraSeleccionada.trasladarFigura(...desplazamientos[event.key]);
                }

                canvasManager.history.renderizar(ctx);
            }
        }

        if (event.ctrlKey && event.key === "z") {
            canvasManager.limpiarCanvas();
            canvasManager.history.undo(ctx);
        }

        if (event.ctrlKey && event.key === "y") {
            canvasManager.limpiarCanvas();
            canvasManager.history.redo(ctx);
        }

        canvasManager.history.renderizar(ctx);
    });

    
});
