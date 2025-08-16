import {obtenerFiltrarPaises, cargarPaises} from './countryFunctions.mjs'
import {conectarDB} from '../config/dbConfig.mjs';

conectarDB();

const paises_filtrados = await obtenerFiltrarPaises();

await cargarPaises(paises_filtrados);

