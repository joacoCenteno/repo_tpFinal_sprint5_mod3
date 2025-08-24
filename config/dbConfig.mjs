import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export async function conectarDB(){
    try{
        await mongoose.connect(process.env.PASS_BD);
        console.log('Conexion exitosa a MongoDB');
    }catch(error){
        console.error('Error al conectar a MongoDB: ',error);
        process.exit(1);
    }
}