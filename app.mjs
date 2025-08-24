import express from 'express';
import {conectarDB} from './config/dbConfig.mjs';
import countryRoutes from './routes/countryRoutes.mjs';
import methodOverride from 'method-override';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Se configura EJS como el motod de vistas de la app
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

//Se configura exoress-ejs-layouts
app.use(expressLayouts);
app.set('layout','layout');

//Servir archivos estáticos
app.use(express.static(path.resolve('./public')));

//Middleware de parseo a JSON
app.use(express.json());

//Middleware de parseo del body
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));

conectarDB();

app.use('/', countryRoutes);

app.use((req,res)=>{
    res.status(404).send({mensaje: 'Ruta no encontrada'});
});


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
