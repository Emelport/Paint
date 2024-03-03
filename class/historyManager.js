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
    undo() {    
        if (this.undoStack.length > 0) {
            const action = this.undoStack.pop(); // Obtener la última acción
            this.redoStack.push(action); // Agregar la acción al historial de rehacer
            this.undoAction(action); // Deshacer la acción
        }
    }
    // Método para deshacer una acción específica
    undoAction(action) {
        // Copiar el redostack en el undostack y quitar el ultimo elemento
        this.undoStack.push(this.redoStack.pop());
    }

    // Método para rehacer la última acción deshecha
    redo() {
        if (this.redoStack.length > 0) {
            const action = this.redoStack.pop(); // Obtener la última acción deshecha
            this.undoStack.push(action); // Agregar la acción nuevamente al historial de deshacer
            this.redoAction(action); // Volver a realizar la acción
        }
    }

    // Método para volver a realizar una acción específica
    redoAction(action) {

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

    renderizar(ctx){
        const actionsRender = this.getRedoStack();
        // console.log(actionsRender);
        actionsRender.forEach(action => {
            console.log(action.tipo);
            if (action.tipo === "figure"){
                action.dato.draw(); 
            }
            else if (action.tipo === "fill"){
                ctx.putImageData(action.dato, 0, 0);
            }

        });
    }
}

export { HistoryManager}