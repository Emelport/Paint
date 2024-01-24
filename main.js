var modo = "";
var modos = ["linea", "lapiz", "borrar"];
var gridEnabled = false;
var startPoint = null;
var endPoint = null;

function cambiarModo(newModo) {
    modo = newModo;
    console.log(modo);
    startPoint = null;
    endPoint = null;
}

function activarGrid() {
    gridEnabled = !gridEnabled;
    drawGrid();
    console.log(gridEnabled);
}

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var gridSize = 25;

    function obtenerCoordenadas(event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    canvas.addEventListener("mousemove", function (event) {
        if (gridEnabled && modos.includes(modo)) {
            var coordenadas = obtenerCoordenadas(event);

            if (modo === "lapiz") {
                ctx.lineTo(coordenadas.x, coordenadas.y);
                ctx.stroke();
            } else if (modo === "borrar") {
                ctx.clearRect(coordenadas.x - 5, coordenadas.y - 5, 30, 30);
            }
        }
    });

    canvas.addEventListener("mousedown", function (event) {
        if (modo === "linea") {
            if (!startPoint) {
                startPoint = obtenerCoordenadas(event);
            } else {
                endPoint = obtenerCoordenadas(event);
                drawLine(startPoint, endPoint);
                startPoint = null;
                endPoint = null;
            }
        } else if (gridEnabled && modos.includes(modo)) {
            if (modo === "lapiz" || modo === "borrar") {
                ctx.beginPath();
                var coordenadas = obtenerCoordenadas(event);
                ctx.moveTo(coordenadas.x, coordenadas.y);
            }
        }
    });

    function drawLine(start, end) {
        var dx = Math.abs(end.x - start.x);
        var dy = Math.abs(end.y - start.y);
        var sx = (start.x < end.x) ? 1 : -1;
        var sy = (start.y < end.y) ? 1 : -1;
        var err = dx - dy;

        while (true) {
            ctx.fillRect(start.x, start.y, 1, 1);

            if ((start.x === end.x) && (start.y === end.y)) {
                break;
            }

            var e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                start.x += sx;
            }

            if (e2 < dx) {
                err += dx;
                start.y += sy;
            }
        }
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (gridEnabled) {
            ctx.beginPath();

            for (var x = 0; x <= canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }

            for (var y = 0; y <= canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }

            ctx.strokeStyle = '#ddd';
            ctx.stroke();
        }
    }

    drawGrid();
});
