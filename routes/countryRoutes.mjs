import express from 'express';
import {obtenerTodosLosPaisesController, insertarPaisController, actualizarPaisController, eliminarPaisController, insertarPaisFormController,editarPaisFormController, renderizarAcercaDeController, generarCsvController} from '../controllers/countryController.mjs'
import {registerValidationRules} from '../validations/validationsRules.mjs'
import {handleValidationErrors} from '../error_middle/errorMiddleware.mjs'


const router = express.Router();


router.get('/',(req,res)=>{
    res.render('index',{title: 'Pagina Principal'})
});

router.get('/pais/insertar-pais', insertarPaisFormController);
router.get('/pais/editar-pais/:id', editarPaisFormController);
router.get('/acerca-de', renderizarAcercaDeController);


router.get('/paises/generar-csv', generarCsvController)

router.get('/paises', obtenerTodosLosPaisesController);

router.post('/pais/insertar',registerValidationRules(), handleValidationErrors('agregarPais','Formulario Ingreso'), insertarPaisController);

router.put('/pais/actualizar/:id',registerValidationRules(), handleValidationErrors('editarPais','Formulario Edicion'), actualizarPaisController);

router.delete('/pais/eliminar/:id',eliminarPaisController);

export default router;