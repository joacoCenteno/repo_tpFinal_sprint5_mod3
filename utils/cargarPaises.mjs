import {obtenerFiltrarPaises, cargarPaises} from './countryFunctions.mjs'
import {conectarDB} from '../config/dbConfig.mjs';

conectarDB(); //Conexion a BD

const paises_filtrados = await obtenerFiltrarPaises(); //Se ejeuta la funcion para filtrar los paises de habla hispana

await cargarPaises(paises_filtrados); //Se cargan a BD los paises filtrados

