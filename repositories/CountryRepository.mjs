import Country from '../models/Country.mjs';
import IRepository from './IRepository.mjs';

class CountryRepository extends IRepository{
    async obtenerTodos(query){
        return await Country.find({$and: [query, {nombrePais: { $exists: true}}, {creador: 'JoaquinC'}]});
    }

    async obtenerPaisesPaginado(pagina,limite,query){
        return await Country.find({$and: [query, {nombrePais: { $exists: true}}, {creador: 'JoaquinC'}]}).skip((pagina - 1) * limite).limit(limite);
    }

    crearInstanciaModelo(body){
        return new Country(body);
    }

    async actualizar(id,body){
        return await Country.findByIdAndUpdate(id,body,{new:true});
    }

    async eliminar(id){
        return await Country.findByIdAndDelete(id);
    }

    async obtenerPorId(id){
        return await Country.findById(id);
    }
}

export default new CountryRepository();