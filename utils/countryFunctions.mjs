import axios from 'axios';
import Country from '../models/Country.mjs'

export async function obtenerFiltrarPaises(){
    try{
    const response = await axios.get('https://restcountries.com/v3.1/region/america');
    const datos = response.data.filter(pais => {return ('spa' in pais.languages)});
    return datos;
        
    }catch(error){
       console.log(`Error: ${error}`);
    }
}


export async function cargarPaises(paises){
    try{
        for(const pais of paises){
            let valor_gini = 0;
            if(typeof(pais.gini) == 'object'){
                const ultimo_gini = Math.max(...Object.keys(pais.gini).map(Number));
                valor_gini = pais.gini[ultimo_gini];
            }

            const new_pais = new Country({
                nombrePais: pais.name.nativeName.spa.official || pais.name.official,
                capitalPais: pais.capital,
                fronteraPais: pais.borders,
                areaPais: pais.area,
                poblacionPais: pais.population,
                desigualdadPais: valor_gini,
                zonaHorariaPais: pais.timezones,
                banderaPais: pais.flags.png,
                creador: 'JoaquinC' 
            });
            await new_pais.save();
        }

        console.log('Se ha ingresado el pais');
    }catch(err){
        console.log(`Error al cargar los paises: ${err}`);
    }
}
