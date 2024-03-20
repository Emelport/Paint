import {CanvasManager} from './canvasManager.js';

class HistoryManager {
  constructor() {
    this.undoStack = []; // Historial de acciones para deshacer
    this.redoStack = []; // Historial de acciones para rehacer
  }

    forward(figura) {
        console.log("Hacia adelante", figura);
        let actionRender = this.redoStack;
        
        for (let i = 0; i < actionRender.length; i++) {
            const action = actionRender[i];
            
            if (action.tipo === "figure" && action.dato === figura) {
                console.log("posicion actual", i);
                actionRender.splice(i, 1);
                let objeto = {dato: figura, tipo: "figure"}
                actionRender.push(objeto);
                console.log("posicion nueva", actionRender.indexOf(figura));
                break;
            }
        }
    }
    backward(figura) {
        console.log("Hacia atrás", figura);
        let actionRender = this.redoStack;
        
        for (let i = 0; i < actionRender.length; i++) {
            const action = actionRender[i];
            
            if (action.tipo === "figure" && action.dato === figura) {
                console.log("posición actual", i);
                actionRender.splice(i, 1);
                let objeto = { dato: figura, tipo: "figure" };
                actionRender.unshift(objeto);
                console.log("posición nueva", actionRender.indexOf(figura));
                break;
            }
        }
    }
    
    uplayer(figura) {
        console.log("Subir capa", figura);
        let actionRender = this.redoStack;
        
        for (let i = 0; i < actionRender.length; i++) {
            const action = actionRender[i];
            
            if (action.tipo === "figure" && action.dato === figura) {
                console.log("posición actual", i);
                actionRender.splice(i, 1);
                let objeto = { dato: figura, tipo: "figure" };
                actionRender.splice(i + 1, 0, objeto);
                console.log("posición nueva", actionRender.indexOf(figura));
                break;
            }
        }
    }
    
    downlayer(figura) {
        console.log("Bajar capa", figura);
        let actionRender = this.redoStack;
        
        for (let i = 0; i < actionRender.length; i++) {
            const action = actionRender[i];
            
            if (action.tipo === "figure" && action.dato === figura) {
                console.log("posición actual", i);
                actionRender.splice(i, 1);
                let objeto = { dato: figura, tipo: "figure" };
                actionRender.splice(i - 1, 0, objeto);
                console.log("posición nueva", actionRender.indexOf(figura));
                break;
            }
        }
    }
    
    

    undo(ctx) {    
        if (this.redoStack.length > 0) {
            console.log("deshacer")
            let elemento = this.redoStack.pop();
            this.undoStack.push(elemento);

            console.log(this.undoStack)
            console.log(this.redoStack)
            this.renderizar(ctx);
        }
    }
    redo(ctx) {
        // Verificar si hay elementos para rehacer
        if (this.undoStack.length > 0) {
            // Sacar el último elemento de la pila de redo y guardarlo en la pila de undo
            let elemento = this.undoStack.pop();
            this.redoStack.push(elemento);

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
                // console.log(figura)
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
    seleccionarFigura(ctx, start) {
        // Seleccionar Figura
        let actionsRender = this.redoStack;
        let figuraSeleccionada = null;
        
        console.log(actionsRender)
        console.log(this.undoStack)
        actionsRender.forEach(action => {
            if (action.tipo === "figure") {
                // Verificar si las coordenadas del punto están dentro de la figura
                if (action.dato.isInside(start)) {
                    figuraSeleccionada = action.dato;
                }
            }
        });
    
        return figuraSeleccionada;
    }
    

    
}

export { HistoryManager}