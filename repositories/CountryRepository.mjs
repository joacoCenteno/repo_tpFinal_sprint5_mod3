import Country from '../models/Country.mjs';
import IRepository from './IRepository.mjs';

class CountryRepository extends IRepository{
    async obtenerTodos(query){
        return await Country.find({$and: [query, {nombrePais: { $exists: true}}, {creador: 'JoaquinC'}]}); //Filtra paises a partir de la query recibida, que exista en el documento la key nombrePais y que el valor de creador sea JoaquinC
    }

    async obtenerPaisesPaginado(pagina,limite,query){
        return await Country.find({$and: [query, {nombrePais: { $exists: true}}, {creador: 'JoaquinC'}]}).skip((pagina - 1) * limite).limit(limite); //Realiza lo mismo que la funcion obtenerTodos() solamente que con skip me toma un determinado numero de documentos y con limit limita esa cantidad traida en un principio
    }

    crearInstanciaModelo(body){
        return new Country(body); //Se instancia una clase Country de acuerdo a lo que recibimos en el body
    }

    async actualizar(id,body){
        return await Country.findByIdAndUpdate(id,body,{new:true}); //Busca por id y posteriormente actualiza en base al body recibido
    }

    async eliminar(id){
        return await Country.findByIdAndDelete(id); //Elimina por id
    }

    async obtenerPorId(id){
        return await Country.findById(id); //Busca por id
    }
}

export default new CountryRepository();