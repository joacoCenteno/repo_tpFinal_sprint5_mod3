import  {validationResult} from 'express-validator';

export const handleValidationErrors = (vista, titulo) => (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render(vista,{
            errors: errors.array(),
            pais: {...req.body, _id:req.params.id},
            title: titulo
        })
       
    }

    next();
}