export default class IRepository{
    obtenerTodos(query){
        throw new Error('Metodo obtenerTodoso() no implementado');
    }

    obtenerPaisesPaginado(pagina,limite,query){
        throw new Error('Método obtenerPaisesPaginado() no implementado');
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