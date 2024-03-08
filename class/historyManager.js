import {CanvasManager} from './canvasManager.js';

class HistoryManager {
  constructor() {
    this.undoStack = []; // Historial de acciones para deshacer
    this.redoStack = []; // Historial de acciones para rehacer
    this.ctx = null;
  }

    setContext(ctx) {
        this.ctx = ctx;
    }

   // Método para agregar una acción al historial de acciones
    addActionToHistory(action) {
        this.undoStack.push(action);
    }

    // Método para deshacer la última acción
    undo() {    
        console.log("deshacer")
        this.undoStack = this.redoStack
        this.undoStack.pop()
        console.log(this.undoStack)
        this.renderizar(this.ctx,2);

    }
    // Método para rehacer la última acción deshecha
    redo() {
       console.log("rehacer")
       this.renderizar(this.ctx,1)
    }
    getUndoStack() {
        return this.undoStack;
    }
    getRedoStack() {
        return this.redoStack;
    }   
    addActionToHistory(dato,tipo) {
        let elemento = {};
        elemento.dato = dato;
        elemento.tipo = tipo;
        this.redoStack.push(elemento);
    }
    renderizar(ctx,option) {
        console.log("renderizar")
        //Limpiar el canvas

        let actionsRender = []
        
        if(option == 1)
        {
            console.log()
            actionsRender = this.redoStack
        }
        else
        {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            actionsRender = this.undoStack
        }
        
        actionsRender.forEach(action => {
            if (action.tipo === "figure") {
                action.dato.draw(); 
            } else if (action.tipo === "fill") {
                // Crear un nuevo canvas temporal
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = ctx.canvas.width;
                tempCanvas.height = ctx.canvas.height;

                // Aplicar el relleno en el nuevo canvas temporal
                tempCtx.putImageData(action.dato, 0, 0);

                // Dibujar el canvas temporal en el contexto principal
                ctx.drawImage(tempCanvas, 0, 0);
            }
        });
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

    seleccionarFigura(ctx,start,color){
        //Seleccionar Figura
        //Recorrer el arreglo de acciones del tipo figura para saber cual es la ultima
        let actionsRender = []
        let figuraSeleccionada = null
        actionsRender = this.redoStack
   
        actionsRender.forEach(action => {
            if (action.tipo === "figure") {
                if (action.dato.isInside(start)){
                    console.log(action.dato)
                    figuraSeleccionada = action.dato
                }
            } else if (action.tipo === "fill") {
  
            }
        });

        return figuraSeleccionada
    }

    
}

export { HistoryManager}