import {obtenerPaisId, obtenerTodosLosPaises, crearInstanciaModelo, actualizarPais, eliminarPais, obtenerPaisesPaginado} from '../services/countryServices.mjs'
import {renderizarListaPaises} from '../views/responseView.mjs';
import {Parser} from 'json2csv';

export async function obtenerTodosLosPaisesController(req,res){
    try{
        //Tomamos el valor de pagina tomado de la query param
        const pagina = parseInt(req.query.pagina) || 1;
        if(pagina < 1) pagina = 1; //En caso de que sea menor que 1, la seteamos a 1
        const limite = 5; //Limite de muestra de paises

        const { filterType, value1, value2} = req.query; //Tomamos esos valores del path
        const query = {}; //Creamos un objeto query

        if(filterType==='nombre' && value1){ //Si el query param filterType es nombre y tenemos tambien value1
            query.nombrePais = {$regex:value1, $options:"i"} //Sumamos a la query el nombrePais segun el value1 que se haya ingresado
        }else if(filterType==='poblacion'){ //En caso de seleccionar la poblacion
            if((req.query.value1 && isNaN(req.query.value1)) || (req.query.value2 && isNaN(req.query.value2))){ //Se verifica que se hayan ingresado solo numeros (caso constrario se ejecuta este if)
                return res.render('dashboard',{paises_formateados:[], pagina: 0, paginas_totales: 0, filtros: req.query, filtrosActivos: false, title: 'Listado de Paises', mensaje: 'NO HAY COINCIDENCIAS CON LA BÚSQUEDA :(', suma_area: [], suma_poblacion:[],promedio_gini:[]});
            }else{ //En caso de ingresar numeros
                query.poblacionPais = {}; 
                //Valores limites para filtrar la poblacion
                if(value1) query.poblacionPais.$gte = parseInt(value1); //minimo
                if(value2) query.poblacionPais.$lte = parseInt(value2); //maximo               
            }

        }
        const paises = await obtenerTodosLosPaises(query); //Se obtienen los paises a partir de la query

        const total = paises.length; //Total de paises obtenidos
        const paginas_totales = Math.ceil(total/limite); //Paginas totales (Se usara para renderizar al EJS)

        const pagina_actual = pagina > paginas_totales ? paginas_totales : pagina; //En caso de que la pagina sea mayor que las paginas totales, la pagina actual sera paginas totales, caso contrario sera la el valor de pagina
        
        

        //res.status(200).json(paises_formateados);
    if(pagina_actual >=1){ //Si la pagina actual es 1 (en caso de no haber coincidencias este valor es 0)
        const paises_paginado = await obtenerPaisesPaginado(pagina_actual,limite,query); //Obtenemos los primeros y posteriores 5 paises a renderizar a partir de la pagina actual
        const paises_formateados = renderizarListaPaises(paises_paginado); //Se formatean a JSON todos los paises
        
        //Informacion para mostrar en la seccion total
        let suma_poblacion = 0;
        let suma_area = 0;
        let suma_gini = 0;
        let promedio_gini =0;
        for(const pais of paises_formateados){
            suma_poblacion+= pais.poblacionPais;
            suma_area+= pais.areaPais;
            suma_gini+= pais.desigualdadPais;
        }

        promedio_gini = (suma_gini / paises_formateados.length).toFixed(2);

        //Valor booleano para saber si existe alguno de esos parametros en el path
        const filtrosActivos = !!(
            (filterType === "nombre" && value1) ||
            (filterType === "poblacion" && (value1 || value2))
        );

        //Renderizamos la informacion el dashboard
        res.render('dashboard',{paises_formateados, pagina: pagina_actual, paginas_totales, filtros: req.query, filtrosActivos, title: 'Listado de Paises', mensaje: null, suma_poblacion, suma_area, promedio_gini, successUpdate: req.query.successUpdate, successCreate: req.query.successCreate, successDelete: req.query.successDelete});
    }else{
        //En caso de no haber coincidencias renderizamos el dashboard sin paises y con un mensaje
        res.render('dashboard',{paises_formateados:[], pagina: pagina_actual, paginas_totales, filtros: req.query, filtrosActivos: false, title: 'Listado de Paises', mensaje: 'NO HAY COINCIDENCIAS CON LA BÚSQUEDA :(', suma_area: [], suma_poblacion:[],promedio_gini:[]});
    }
        

    }catch(err){
        res.status(500).send({message: 'Error al obtener todos los paises', error: err.message});
    }
}

export async function insertarPaisController(req,res){
    try{
        //Se crea un nuevo pais
        const nuevo_pais = crearInstanciaModelo({
            ...req.body,
            desigualdadPais: parseFloat(req.body.desigualdadPais), //Se parsea a float
            creador: 'JoaquinC'
        });

        const pais_guardado = await nuevo_pais.save(); //Se guarda el pais

        //res.status(200).json({message: 'Pais creado', pais: pais_guardado});
        res.status(200).redirect('/paises?pagina=1&successCreate=1'); //En caso de exito, se redirige al dashboard con pagina=1 y un mensaje de exito en la creacion
    }catch(err){
        res.status(500).send({message: 'Error al insertar pais', error: err.message});
    }
}

export async function actualizarPaisController(req,res){
    try{
        const {id} = req.params; //Se toma el id del pais a actualizar
        const pais_actualizado = await actualizarPais(id, {...req.body, desigualdadPais: parseFloat(req.body.desigualdadPais) , creador: 'JoaquinC'}); //Se actualiza el pais a partir del body obtenido

        if(!pais_actualizado){
            //return res.status(404).send({message: 'No se pudo actualizar el pais'})
            console.log('Error');
        }

        //res.status(200).json({message: 'Pais actualizado con exito', pais: pais_actualizado});
        res.status(200).redirect('/paises?pagina=1&successUpdate=1'); //Se redirige a la pagina de dashboard con un mensaje de exito en la actualizacion
    }catch(err){
        res.status(500).send({mensaje:'Error al actualizar el pais'});
    }
}

export async function eliminarPaisController(req,res){
    try{
        const {id} = req.params; //Se toma el id del pais a eliminar
        const pais_eliminado = await eliminarPais(id); //Se elimina el pais

        if(!pais_eliminado){
            return res.status(404).send({message: 'Pais no eliminado'});
        }

        //res.status(200).json({message: 'Pais eliminado', pais: pais_eliminado});
        res.status(200).redirect('/paises/?pagina=1&successDelete=1'); //En caso de exito se redirige a la pagina de dashboard mostrando un mensaje de exito en la eliminacion
    }catch(err){
        res.status(500).send({message: 'Error al eliminar el pais'});
    }
}



//Renderizacion para el formulario de ingreso
export function insertarPaisFormController(req,res){
    res.render('agregarPais',{errors:[], pais:{}, title:'Formulario Ingreso'}); //Sin errores y sin un pais
}

//Renderizacion para el formulario de edicion
export async function editarPaisFormController(req,res){
    const {id} = req.params; //Se toma el id
    const pais = await obtenerPaisId(id); //Se obtiene el pais

    res.render('editarPais',{errors:[], pais: pais, title: 'Formulario Edicion'}); //Se renderiza sin errores y con el pais obtenido anteriormente
}

//Renderizacion a la pagina de acerca de
export function renderizarAcercaDeController(req,res){
    res.render('acercaDe',{title:'Acerca De'});
}


//logica para la generacion de CSV
export async function generarCsvController(req,res){
    try{
    const {filterType, value1, value2} = req.query;
    const query = {};

    if(filterType === "nombre" && value1){
        query.nombrePais = { $regex: value1, $options: "i"};
    }else if(filterType==="poblacion"){
        query.poblacionPais = {};
        if(value1) query.poblacionPais.$gte = parseInt(value1);
        if(value2) query.poblacionPais.$lte = parseInt(value2);     //TODA ESTA PARTE ES IDEM A LO REALIZADO EN LA FUNCION obtenerTodosController()
    }

    const paises = await obtenerTodosLosPaises(query);

    const paises_formateados = renderizarListaPaises(paises);

    //Se mapean todos los paises, ahora realizando que los arrays como capitalPais se vuelvan en string (los elementos) ['Sucre','La Paz'] ==> "Sucre, La Paz"
    const paises_csv = paises_formateados.map(pais =>{
        return {
            ...pais,
            capitalPais: pais.capitalPais.join(', '),
            fronteraPais: pais.fronteraPais.join(', '),
            zonaHorariaPais: pais.zonaHorariaPais.join(', ')
        }
    });

    //Campos para el CSV
    const fields =[
        {
            label: 'Nombre Pais',
            value: 'nombrePais'
        },
        {
            label: 'Capital/es Pais',
            value: 'capitalPais'
        },
        {
            label: 'Frontera/s Pais',
            value: 'fronteraPais'
        },
        {
            label: 'Area Pais',
            value: 'areaPais'
        },
        {
            label: 'Poblacion Pais',
            value: 'poblacionPais'
        },
        {
            label: 'Desigualdad Pais',
            value: 'desigualdadPais'
        },
        {
            label: 'Zona Horaria Pais',
            value: 'zonaHorariaPais'
        },
    ]

    try{
        const jsonCsvParser = new Parser({fields, withBOM:true}); //Se crea un objeto Parser con withBOM para la utilizacion de ASCII
        const csv = jsonCsvParser.parse(paises_csv);

        res.header('Content-Type','text/csv'); //Header 
        res.attachment('paises_filtrados.csv');//Nombre del archivo
        res.status(200).send(csv); //Envio del archivo
    }catch(err){
        res.status(500).send({mensaje:'Error al generar el csv',error:err.message})
    }

    }catch(error){
        res.status(500).send({mensaje:'Error al obtener todos los paises',error:error.message})
    }
    
}