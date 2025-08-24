import CountryRepository from '../repositories/CountryRepository.mjs';

export async function obtenerTodosLosPaises(query){
    return await CountryRepository.obtenerTodos(query);
}

export async function obtenerPaisesPaginado(pagina,limite,query){
    return await CountryRepository.obtenerPaisesPaginado(pagina,limite,query)
}

export function crearInstanciaModelo(body){
    return CountryRepository.crearInstanciaModelo(body);
}

export async function actualizarPais(id,body){
    return await CountryRepository.actualizar(id,body);
}

export async function eliminarPais(id){
    return await CountryRepository.eliminar(id);
}

export async function obtenerPaisId(id){
    return await CountryRepository.obtenerPorId(id);
}