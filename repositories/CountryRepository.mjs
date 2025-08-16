import Country from '../models/Country.mjs';
import IRepository from './IRepository.mjs';

class CountryRepository extends IRepository{
    async obtenerTodos(){
        return await Country.find({nombrePais: { $exists: true}, creador: 'JoaquinC'});
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