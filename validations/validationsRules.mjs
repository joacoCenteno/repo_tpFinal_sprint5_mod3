import {body} from 'express-validator';

export const registerValidationRules = () =>[
    body('nombrePais')
        .notEmpty().withMessage('El nombre del pais es requerido')
        .trim()
        .escape()
        .isLength({min:3, max: 90}).withMessage('La longitud del nombre del pais debe estar entre 3-90 caracteres'),
    body('capitalPais')
        .trim()
        .customSanitizer(value =>{
            if(!value) return [];
            return value.split(',').map(item => item.trim());
        })
        .isArray({min:1}).withMessage('Debe existir al menos una capital')
        .exists({checkFalsy: true}).withMessage('La capital/es es requerido'),
    body('capitalPais')
        .custom((capitales) => {
            if (!Array.isArray(capitales)) return false;
    
            const capitales_invalidas = capitales.filter(capital => capital.length < 3 || capital.length > 90);
            if (capitales_invalidas.length > 0) {
               throw new Error('Todas las capitales deben tener entre 3 y 90 caracteres');
            }
            return true;
    }),
    body('capitalPais.*')
        .trim()
        .escape(),
    body('fronteraPais')
        .trim()
        .customSanitizer(value =>{
            if(!value) return [];
            return value.split(',').map(item => item.trim());
        }),
    body('fronteraPais')
        .custom((fronteras) => {
            if (!Array.isArray(fronteras)) return false;

            const invalids = fronteras.filter(f => !/^[A-Z]{3}$/.test(f));
            if (invalids.length > 0) {
                throw new Error('Cada frontera debe tener exactamente 3 letras mayúsculas');
            }
        return true;
    }),
    body('desigualdadPais')
        .exists().withMessage('La desigualdad del pais es requerido')
        .isFloat({min:0,max:100}).withMessage('El indice de desigualdad varia en un rango de 0-100'),
    body('areaPais')
        .exists().withMessage('El area del pais es requerido')
        .isFloat({min:1}).withMessage('El area debe ser un valor positivo'),
    body('poblacionPais')
        .exists().withMessage('La poblacion del pais es requerida')
        .isInt({min:1}).withMessage('La poblacion debe ser un entero no negativo'),
    body('zonaHorariaPais')
        .trim()
        .customSanitizer(value =>{
            if(!value) return [];
            return value.split(',').map(item => item.trim());
        })
        .isArray({min:1}).withMessage('Debe existir al menos una franja horaria'),
    body('zonaHorariaPais.*')
        .notEmpty().withMessage('La franja horaria del pais es requerido')
        .isString().withMessage('Las franjas horarias deben describirse en String')
        .trim()
        .escape(),
]