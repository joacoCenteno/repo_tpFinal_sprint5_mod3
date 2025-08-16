import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
    {
        nombrePais: {type: String, required: true},
        capitalPais: [String],
        fronteraPais: [String],
        areaPais: {type: Number},
        poblacionPais: {type: Number},
        desigualdadPais: {type: Object, default: null},
        zonaHorariaPais: [String],
        banderaPais: {type:String},
        creador: String
    },
    { collection: 'Grupo-12'}
);

const Country = mongoose.model('Country', countrySchema, 'Grupo-12');
export default Country;