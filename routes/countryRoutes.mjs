import express from 'express';
import {obtenerTodosLosPaisesController, insertarPaisController, actualizarPaisController, eliminarPaisController, insertarPaisFormController,editarPaisFormController, renderizarAcercaDeController, generarCsvController} from '../controllers/countryController.mjs'
import {registerValidationRules} from '../validations/validationsRules.mjs'
import {handleValidationErrors} from '../error_middle/errorMiddleware.mjs'


const router = express.Router();

//Se renderiza la pagina principal
router.get('/',(req,res)=>{
    res.render('index',{title: 'Pagina Principal'})
});

//Rutas para ingresar a los formularios y pagina de Acerca De
router.get('/pais/insertar-pais', insertarPaisFormController);
router.get('/pais/editar-pais/:id', editarPaisFormController);
router.get('/acerca-de', renderizarAcercaDeController);

//Ruta para la generacion del csv
router.get('/paises/generar-csv', generarCsvController)

router.get('/paises', obtenerTodosLosPaisesController); //Ruta para mostrar todos los paises (posteriormente filtrados)

router.post('/pais/insertar',registerValidationRules(), handleValidationErrors('agregarPais','Formulario Ingreso'), insertarPaisController); //Ruta para el ingreso de un nuevo pais

router.put('/pais/actualizar/:id',registerValidationRules(), handleValidationErrors('editarPais','Formulario Edicion'), actualizarPaisController); //Ruta para la modificacion de algun pais

router.delete('/pais/eliminar/:id',eliminarPaisController); //Ruta para la eliminacion de un pais

export default router;