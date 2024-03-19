import {CanvasManager} from './canvasManager.js';

class HistoryManager {
  constructor() {
    this.undoStack = []; // Historial de acciones para deshacer
    this.redoStack = []; // Historial de acciones para rehacer
  }

   // Método para agregar una acción al historial de acciones
    addActionToHistory(action) {
        this.undoStack.push(action);
    }

    // Método para deshacer la última acción
    undo(ctx) {    
        console.log("deshacer")
        //Almacenar el elemento que se va a sacar y guardarlo en la pila de undo
        let elemento = this.redoStack.pop();
        this.undoStack.push(elemento);

        console.log(this.undoStack)
        this.renderizar(ctx);

    }
    // Método para rehacer la última acción deshecha
    redo(ctx) {
        // Verificar si hay elementos para rehacer
        if (this.redoStack.length > 0) {
            // Sacar el último elemento de la pila de redo y guardarlo en la pila de undo
            let elemento = this.redoStack.pop();
            this.undoStack.push(elemento);

            // Renderizar la acción
            this.renderizar(ctx);
        }
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
    renderizar(ctx) {
        const actionsRender = this.redoStack;

        // Dibujar todas las figuras en la pila de acciones
        for (const action of actionsRender) {
            if (action.tipo === "figure") {
                const figura = action.dato;
                figura.draw();
    
                // Si la figura está rellena, rellenarla después de dibujarla
                if (figura.estaRellena) {
                    figura.rellenar(ctx, null, figura.color);
                }
            }
        }
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
                console.log(action.dato.isInside(start))
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