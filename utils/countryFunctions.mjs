import axios from 'axios';
import Country from '../models/Country.mjs'

export async function obtenerFiltrarPaises(){
    try{
    const response = await axios.get('https://restcountries.com/v3.1/region/america'); // Se consume la API
    const datos = response.data.filter(pais => {return ('spa' in pais.languages)}); //Filtrado de aquellos que tengan 'spa' en la key de languages
    return datos; //Se devuelven los datos filtrados
        
    }catch(error){
       console.log(`Error: ${error}`);
    }
}


export async function cargarPaises(paises){
    try{
        for(const pais of paises){
            let valor_gini = 0; //Valor default de gini
            if(typeof(pais.gini) == 'object'){ //En caso de ser objeto (puede ser undefined)
                const ultimo_gini = Math.max(...Object.keys(pais.gini).map(Number)); //Buscamos la key (año) maxima, el año mas proximo a hoy
                valor_gini = pais.gini[ultimo_gini]; //Tomamos el valor de esa key
            }

            //Creamos el nuevo pais a partir del modelo 
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
            await new_pais.save(); //Guardamos el pais
        }

        console.log('Se ha ingresado el pais');
    }catch(err){
        console.log(`Error al cargar los paises: ${err}`);
    }
}
