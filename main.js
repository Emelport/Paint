var modo = "";
var color = "#000000";
var grosor = 1;

var modos = ["linea", "lapiz", "borrar","cuadrado"];
var gridEnabled = false;
var startPoint = null;
var endPoint = null;
var ctx;  // Declarar el contexto como variable global

function cambiarModo(newModo) {
    modo = newModo;
    console.log(modo);
    var modoParrafo = document.getElementById("modoActual");
    modoParrafo.innerHTML = modo;

    startPoint = null;
    endPoint = null;
}

function cambiarColor(newColor) {
    color = newColor;
    console.log(color);
    var colorParrafo = document.getElementById("colorActual");
    colorParrafo.innerHTML = color;

    // Configurar el color cada vez que cambias el color
    ctx.strokeStyle = color;
}

function cambiarGrosor(newGrosor) {
    grosor = newGrosor;
    console.log(grosor);
    // Configurar el grosor cada vez que cambias el grosor
    ctx.lineWidth = grosor;
}

function activarGrid() {
    gridEnabled = !gridEnabled;
    drawGrid();
    console.log(gridEnabled);
}

// CANVAS
document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");  // Asignar el contexto global aquí

    //Si esta vacio el color
    if (!color) {
        color = "#000000";
    }

    // Configurar color y grosor iniciales
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;

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

        }else if(modo === "cuadrado"){
            if (!startPoint) {
                startPoint = obtenerCoordenadas(event);
            } else {
                endPoint = obtenerCoordenadas(event);
                drawCuadrado(startPoint, endPoint);
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

    //LINEA  BRESENHAM
    function drawLine(start, end) {
        // Algoritmo de Bresenham
        //Calcular la distancia entre los dos puntos
        var dx = Math.abs(end.x - start.x);
        var dy = Math.abs(end.y - start.y);
        
        var sx = (start.x < end.x) ? 1 : -1; // 1 si es positivo, -1 si es negativo
        var sy = (start.y < end.y) ? 1 : -1;
        //Calcular el error
        var err = dx - dy;

        while (true) {
            //Dependiendo del grosor dibujar mas pixeles alrederor del punto
            for (var i = 0; i < grosor; i++) {
                for (var j = 0; j < grosor; j++) {
                    ctx.fillStyle = color;
                    ctx.fillRect(start.x + i, start.y + j, 1, 1);
                }
            }

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
    
    //y = mx + b
    function drawLine2(start, end) {
        // Ecuacion de la recta y = mx + b
        var m = (end.y - start.y) / (end.x - start.x); // Pendiente
        var b = start.y - m * start.x; // Ordenada en el origen

        //Intercambiar los puntos para que siempre se dibuje de izquierda a derecha
        if (start.x > end.x) {
            var temp = start;
            start = end;
            end = temp;
        }

        //Coordenada inicial
        var x = start.x;
        var y = start.y;

        while (x <= end.x) {
            //Dependiendo del grosor dibujar mas pixeles alrederor del punto 
            for (var i = 0; i < grosor; i++) {
                for (var j = 0; j < grosor; j++) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x + i, y + j, 1, 1);
                }
            }
            x++;
            y = Math.round(m * x + b);
            ctx.fillRect(x, y, 1, 1);
        }

        //Pintar el punto final
        ctx.fillStyle = color;
        ctx.fillRect(end.x, end.y, 1, 1);
    }

   
    // DIGITAL DIFFERENTIAL ANALYZER
    function drawLineDDA(start, end) {
        // Algoritmo de DDA

        // Calcular la distancia entre los dos puntos
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        // Calcular el numero de pasos
        var steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
        // Calcular el incremento para cada paso
        var xIncrement = dx / steps;
        var yIncrement = dy / steps;
        // Coordenada inicial
        var x = start.x;
        var y = start.y;
        // Dibujar cada punto
        for (var i = 0; i <= steps; i++) {
            // Redondear las coordenadas
            var roundedX = Math.round(x);
            var roundedY = Math.round(y);

            // Dependiendo del grosor, dibujar más píxeles alrededor del punto
            for (var k = 0; k < grosor; k++) {
                for (var j = 0; j < grosor; j++) {
                    ctx.fillStyle = color;
                    ctx.fillRect(roundedX + k, roundedY + j, 1, 1);
                }
            }

            // Actualizar las coordenadas con el incremento
            x += xIncrement;
            y += yIncrement;
        }
    }

    function drawCuadrado(start,end){
        // Recibe los puntos de la esquina superior izquierda y la esquina inferior derecha
        var x = start.x;
        var y = start.y;
        
        // Calcular los pixeles de ancho y alto 
        var width = end.x - start.x;
        var height = end.y - start.y;

        // Dependiendo del grosor, dibujar más píxeles alrededor del punto
        for (var i = 0; i < grosor; i++) {
            for (var j = 0; j < grosor; j++) {
                ctx.fillStyle = color;
                ctx.fillRect(x + i, y + j, width, height);
            }
        }
    }
});
