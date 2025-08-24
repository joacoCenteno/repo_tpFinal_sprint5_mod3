# 🌍 Proyecto Gestión de Países

Aplicación web desarrollada con **Node.js + Express** en el backend, **EJS** como motor de plantillas, y **Tailwind CSS** para los estilos.  
La app permite **visualizar, filtrar, paginar y exportar a CSV** información de países almacenados en una base de datos **MongoDB**.

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [MongoDB](https://www.mongodb.com/) (local o remoto, ej. Atlas)
- [npm](https://www.npmjs.com/) 

---

## 🚀 Pasos de ejecución

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/joacoCenteno/repo_tpFinal_sprint5_mod3.git

2. **Instalar dependencias**
   ```bash
   npm install

3. **Configurar variables de entorno:** 
    Crear un archivo .env en la raiz del proyecto
   ```bash
   PORT=3000
   PASS_BD=tu direccion mongo

4. **Ingresar a la carpeta utils y ejecutar el archivo cargarPaises.mjs**
   ```bash
   cd utils
   node cargarPaises.mjs
   
5. **Volver a la raiz del proyecto y ejecutar el servidor**
   ```bash
   cd ..
   node app.mjs
---
## 🛠️ Tecnologías utilizadas
- ⚡ **Node.js** – Entorno de ejecución para JavaScript en el backend
- 🚀 **Express** – Framework minimalista para crear la API y rutas
- 🍃 **MongoDB** – Base de datos NoSQL
- 📦 **Mongoose** – ODM para modelar los datos en MongoDB
- 🎨 **EJS** – Motor de plantillas para renderizar vistas en el servidor
- 🎨 **TailwindCSS** – Framework CSS para estilos rápidos y consistentes
- 🔑 **dotenv** – Manejo seguro de variables de entorno
- 📑 **csv-writer** – Generación y exportación de archivos CSV
- 
---

## 📂 Estructura del proyecto
```bash
  .
  ├── config/        # Configuracion de la BD
  ├── error_middle/  # Middleware para el control de errores
  ├── models/        # Modelo de MongoDB (Mongoose)
  ├── repositories/  # Implementacion de funciones basicas
  ├── controllers/   # Lógica de controladores
  ├── routes/        # Rutas de Express
  ├── services/      # Funciones de servicio
  ├── utils/         # Logica para el cargado de paises a la BD
  ├── validations/   # Validaciones de paises por parte del backend
  ├── views/         # Plantillas EJS
  ├── public/        # Archivos estáticos ( imágenes)
  ├── .env           # Variables de entorno (no subir a git)
  ├── app.mjs        # Archivo principal
  ├── package.json
  └── README.md


  
