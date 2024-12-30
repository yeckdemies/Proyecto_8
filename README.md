# Proyecto para la Gestión de Categorías y Recetas
API para la gestión de recetas y sus categorías

## Librerías necesarias
- Node.js (versión v20.11.0)
- MongoDB
- npm (gestor de paquetes de Node.js)

## Instalación
1. Clona el repositorio:
    ```sh
    git clone https://github.com/yeckdemies/Proyecto_8.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd Proyecto_8
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```

## Carga inicial de datos (Opcional)
1. Navega al directorio seeds
    ```sh
    cd Proyecto_8/src/utils/
    ```
2. Ejecuta la semilla
    ```sh
    node seed.js
    ```
## Ejecución en Desarrollo
1. Inicia el servidor en modo desarrollo:
    ```sh
    npm run dev
    ```
    
## Rutas API
1. Categorías
- `POST http://localhost:3000/api/v1/categories/createCategory`
Crear Categoría
Form-Data
    name - text
    imageUrl - file

- `GET http://localhost:3000/api/v1/categories`
Obtener Categorías

- `PUT http://localhost:3000/api/v1/categories/updateCategory/:id`
Actualizar Categoría
Form-Data
    name - text
    imageUrl - file

- `DELETE http://localhost:3000/api/v1/categories/deleteCategory/:id`
Eliminar categoría por ID

2. Recetas
- `POST http://localhost:3000/api/v1/recipes/createRecipe`
Crear una nueva receta
Form-Data
    name - text
    description - text
    imageUrl - file
    category - text (id category)

- `GET http://localhost:3000/api/v1/recipes`
Obtener todas las recetas

- `PUT http://localhost:3000/api/v1/recipes/updateRecipe/:id`
Actualizar una recepta
Form-Data
    name - text
    description - text
    imageUrl - file
    category - text (id category)

- `DELETE http://localhost:3000/api/v1/recipes/deleteRecipe/:id`
Eliminar una receta por id

## Validación
Para validar que todo funciona correctamente, con Postman o Insomnia puedes hacer peticiones a las rutas de la API.

## Instrucciones
1. Categorías
    - Las categorías solo contienen un nombre y una imagen. 
    - Nombre e imagen son obligatorios en la creación de una nueva categoría.
    - Al modificar la imagen de una categoría la anterior es eliminada de cloudinary y subida la nueva, este proceso actualiza la url en la base de datos. 
    - Al eliminar una categoría se elimina su imagen.
    - Al eliminar una categoría también es eliminada de la receta que la contenga. 

2. Recetas
    - Todos los campos de la receta son obligatorios.
    - Al actualizar una receita se elimina la imagen anterior y se sube la nueva, esta queda referenciada en la base de datos. 
    - Al actualizar la categoría de una receta se verifica si el id tiene el formato aceptado por mongoose y si existe para actualizarlo. Si no se devuelve error. 

## Paquetes Necesarios
- `express`: Framework para construir aplicaciones web y APIs.
- `mongoose`: ODM (Object Data Modeling) para MongoDB y Node.js.
- `dotenv`: Cargar variables de entorno desde un archivo `.env`.
- `cloudinary`: Gestionar y alojar imágenes y videos en la nube.
- `multer`: Manejar la carga de archivos desde formularios en Node.js.
- `multer-storage-cloudinary`: Integrar Multer con Cloudinary y almacenar archivos directamente en la nube.
