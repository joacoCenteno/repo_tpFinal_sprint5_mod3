export default class IRepository{
    obtenerTodos(){
        throw new Error('Metodo obtenerTodoso() no implementado');
    }

    crearInstanciaModelo(body){
        throw new Error('Metodo crearInstanciaModelo() no implementado');
    }

    actualizar(id,body){
        throw new Error('Metodod actualizar() no implementado');
    }

    eliminar(id){
        throw new Error('Metodo eliminarPorId() no implementado');
    }

    obtenerPorId(id){
        throw new Error('Metodo obtenerPorId() no implementado');
    }
}