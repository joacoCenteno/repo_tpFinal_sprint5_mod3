import {obtenerPaisId, obtenerTodosLosPaises, crearInstanciaModelo, actualizarPais, eliminarPais} from '../services/countryServices.mjs'
import {renderizarPais, renderizarListaPaises} from '../views/responseView.mjs';
import {Parser} from 'json2csv';

export async function obtenerTodosLosPaisesController(req,res){
    try{
        const paises = await obtenerTodosLosPaises();

        const paises_formateados = renderizarListaPaises(paises);
        //res.status(200).json(paises_formateados);
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

        res.render('dashboard',{paises_formateados, title: 'Listado de Paises', suma_poblacion, suma_area, promedio_gini, successUpdate: req.query.successUpdate, successCreate: req.query.successCreate, successDelete: req.query.successDelete});
    }catch(err){
        res.status(500).send({message: 'Error al obtener todos los paises', error: err.message});
    }
}

export async function insertarPaisController(req,res){
    try{
        const nuevo_pais = crearInstanciaModelo({
            ...req.body,
            desigualdadPais: parseFloat(req.body.desigualdadPais),
            creador: 'JoaquinC'
        });

        const pais_guardado = await nuevo_pais.save();

        //res.status(200).json({message: 'Pais creado', pais: pais_guardado});
        res.status(200).redirect('/paises?successCreate=1');
    }catch(err){
        res.status(500).send({message: 'Error al insertar pais', error: err.message});
    }
}

export async function actualizarPaisController(req,res){
    try{
        const {id} = req.params;
        const pais_actualizado = await actualizarPais(id, {...req.body, desigualdadPais: parseFloat(req.body.desigualdadPais) , creador: 'JoaquinC'});

        if(!pais_actualizado){
            //return res.status(404).send({message: 'No se pudo actualizar el pais'})
            console.log('Error');
        }

        //res.status(200).json({message: 'Pais actualizado con exito', pais: pais_actualizado});
        res.status(200).redirect('/paises?successUpdate=1');
    }catch(err){
        res.status(500).send({mensaje:'Error al actualizar el pais'});
    }
}

export async function eliminarPaisController(req,res){
    try{
        const {id} = req.params;
        const pais_eliminado = await eliminarPais(id);

        if(!pais_eliminado){
            return res.status(404).send({message: 'Pais no eliminado'});
        }

        //res.status(200).json({message: 'Pais eliminado', pais: pais_eliminado});
        res.status(200).redirect('/paises/?successDelete=1');
    }catch(err){
        res.status(500).send({message: 'Error al eliminar el pais'});
    }
}




export function insertarPaisFormController(req,res){
    res.render('agregarPais',{errors:[], pais:{}, title:'Formulario Ingreso'});
}

export async function editarPaisFormController(req,res){
    const {id} = req.params;
    const pais = await obtenerPaisId(id);

    res.render('editarPais',{errors:[], pais: pais, title: 'Formulario Edicion'});
}

export function renderizarAcercaDeController(req,res){
    res.render('acercaDe',{title:'Acerca De'});
}

export async function generarCsvController(req,res){
    try{
    const paises = await obtenerTodosLosPaises();

    const paises_formateados = renderizarListaPaises(paises);
    const paises_csv = paises_formateados.map(pais =>{
        return {
            ...pais,
            capitalPais: pais.capitalPais.join(', '),
            fronteraPais: pais.fronteraPais.join(', '),
            zonaHorariaPais: pais.zonaHorariaPais.join(', ')
        }
    });
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
        const jsonCsvParser = new Parser({fields, withBOM:true});
        const csv = jsonCsvParser.parse(paises_csv);

        res.header('Content-Type','text/csv');
        res.attachment('paises.csv');
        res.status(200).send(csv);      
    }catch(err){
        res.status(500).send({mensaje:'Error al generar el csv',error:err.message})
    }

    }catch(error){
        res.status(500).send({mensaje:'Error al obtener todos los paises',error:error.message})
    }
    
}