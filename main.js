var modo = "";
var color = "#000000";
var grosor = 1;
var drawing = false;

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

    //evento click y arrastrar
    canvas.addEventListener("mousemove", function (event) {
        if (drawing) {
            var coordenadas = obtenerCoordenadas(event);
            if (modo === "lapiz") {
               drawPixel(coordenadas.x, coordenadas.y);

            } else if (modo === "borrar") {
                for (var i = 0; i < grosor; i++) {
                    for (var j = 0; j < grosor; j++) {
                        ctx.clearRect(coordenadas.x, coordenadas.y, grosor, grosor);
                    }
                }
            } else if( modo === "cuadrado" ){
                

            }
        }
    });


    canvas.addEventListener("mouseup", function (event) {
       drawing = false;
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

        } else if (modos.includes(modo)) {
            if (modo === "lapiz" || modo === "borrar") {
                ctx.beginPath();
                var coordenadas = obtenerCoordenadas(event);
                ctx.moveTo(coordenadas.x, coordenadas.y);
                drawing = true;
            }
        }
    });
    
// LINEA BRESENHAM
function drawLine(start, end) {
    // Algoritmo de Bresenham
    
    // Calcular la distancia entre los dos puntos
    var dx = Math.abs(end.x - start.x);
    var dy = Math.abs(end.y - start.y);
    
    var sx = (start.x < end.x) ? 1 : -1; // si el punto inicial es menor que el punto final entonces sx = 1, de lo contrario sx = -1
    var sy = (start.y < end.y) ? 1 : -1; // si el punto inicial es menor que el punto final entonces sy = 1, de lo contrario sy = -1
    // Calcular el pk
    var pk = dx - dy;

    while (true) {
        // Dependiendo del grosor, dibujar más píxeles alrededor del punto

        drawPixel(start.x, start.y);

        if ((start.x === end.x) && (start.y === end.y)) {
            break;
        }

        var e2 = 2 * pk; // 2 * Δpk

        // Formulas del algoritmo de Bresenham

        // Primera condición: e2 > -dy
        if (e2 > -dy) {
            pk -= dy;      // Δpk -= Δy
            start.x += sx;  // x += sx
        }

        // Segunda condición: e2 < dx
        if (e2 < dx) {
            pk += dx;      // Δpk += Δx
            start.y += sy;  // y += sy
        }
    }
}


    // y = mx + b
    function drawLine2(start, end) {
        // Ecuacion de la recta y = mx + b

        var dx = end.x - start.x;        // Delta x
        var dy = end.y - start.y;        // Delta y

        // Pendiente
        var m = dy / dx;
        var b = start.y - m * start.x;   // Ordenada en el origen

        // Intercambiar los puntos para que siempre se dibuje de izquierda a derecha
        if (start.x > end.x) {
            var temp = start;
            start = end;
            end = temp;
        }

        // Coordenada inicial
        var x = start.x;
        var y = start.y;

        // Determinar el cuadrante
        var xIncrement, yIncrement;

        if (Math.abs(m) <= 1) {
            xIncrement = 1;
            yIncrement = m;
        } else {
            xIncrement = 1 / Math.abs(m);
            yIncrement = m < 0 ? -1 : 1;
        }

        //Dibujar los puntos intermedios
        while (x <= end.x) {
            drawPixel(Math.round(x), Math.round(y));
            x += xIncrement;
            y += yIncrement;
        }

        // Pintar el punto final
        drawPixel(end.x, end.y);
    }

   // Dependiendo del grosor, dibujar más píxeles alrededor del punto 
function drawPixel(x, y) {
    var halfThickness = Math.floor(grosor / 2);

    for (var i = -halfThickness; i <= halfThickness; i++) {
        for (var j = -halfThickness; j <= halfThickness; j++) {
            ctx.fillStyle = color;
            ctx.fillRect(x + i, y + j, 1, 1);
        }
    }
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
            drawPixel(roundedX, roundedY);
            // Actualizar las coordenadas con el incremento
            x += xIncrement;
            y += yIncrement;
        }
    }

    function drawCuadrado(start, end) {
        // Calcular el ancho y alto del cuadrado
        var width = Math.abs(end.x - start.x);
        var height = Math.abs(end.y - start.y);
    
        // Determinar el punto de inicio y el punto final para el cuadrado
        var cuadradoStart = {
            x: (end.x > start.x) ? start.x : end.x,
            y: (end.y > start.y) ? start.y : end.y
        };
    
        var cuadradoEnd = {
            x: cuadradoStart.x + Math.min(width, height),
            y: cuadradoStart.y + Math.min(width, height)
        };
    
        // Dibujar el contorno del cuadrado
        drawLineDDA(cuadradoStart, { x: cuadradoEnd.x, y: cuadradoStart.y });
        drawLineDDA({ x: cuadradoEnd.x, y: cuadradoStart.y }, cuadradoEnd);
        drawLineDDA(cuadradoEnd, { x: cuadradoStart.x, y: cuadradoEnd.y });
        drawLineDDA({ x: cuadradoStart.x, y: cuadradoEnd.y }, cuadradoStart);
    }
    
});
