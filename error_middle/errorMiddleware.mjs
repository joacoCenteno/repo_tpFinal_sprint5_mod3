import  {validationResult} from 'express-validator';

export const handleValidationErrors = (vista, titulo) => (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){ //En caso de que tengamos errores, vamos a renderizar la vista correspondiente (ingreso o edicion) pasando el array de errores para una mejor experiencia de usaurio
        return res.render(vista,{
            errors: errors.array(),
            pais: {...req.body, _id:req.params.id}, //Tambien para mantener los valores en los inputs se pasan los valores anteriormente ingresados
            title: titulo
        })
       
    }

    next();
}