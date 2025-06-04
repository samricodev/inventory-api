
---

# Proyecto de Inventario - Aplicación Web Full-Stack

Este proyecto es una aplicación web para gestionar inventarios. Permite a los usuarios agregar, editar, eliminar y consultar productos dentro de un sistema de inventario. Se implementa utilizando una arquitectura full-stack, donde el frontend interactúa con un backend que maneja la base de datos y la lógica de negocio.

## Tecnologías Usadas

- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
  - React.js (para la interfaz de usuario)
  - Axios (para realizar peticiones HTTP al backend)

- **Backend**:
  - Node.js
  - Express.js (para crear la API REST)
  - JWT (para autenticación de usuarios)

- **Base de Datos**:
  - MongoDB (NoSQL, para almacenar los datos de los productos e información de los usuarios)

## Funcionalidades

1. **Gestión de Productos**:
   - Ver productos disponibles en el inventario.
   - Agregar nuevos productos al inventario.
   - Editar productos existentes.
   - Eliminar productos del inventario.

2. **Autenticación y Autorización**:
   - Registro y login de usuarios.
   - Autenticación basada en JWT.
   - Roles de usuarios para controlar el acceso (Administrador, Usuario normal).

3. **Interfaz de Usuario**:
   - Panel de control para gestionar el inventario.
   - Formulario de adición y edición de productos.
   - Listado dinámico de productos.

## Requisitos

- **Node.js** y **npm** instalados.
- **MongoDB** para la base de datos.
- Un editor de texto o IDE (como **VS Code**).

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local.

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/inventario-fullstack.git
   cd inventario-fullstack
   ```

2. **Instala las dependencias del Backend**:
   ```bash
   cd backend
   npm install
   ```

3. **Instala las dependencias del Frontend**:
   ```bash
   cd frontend
   npm install
   ```

4. **Configura las variables de entorno**:
   - Crea un archivo `.env` en el directorio `backend` y agrega las siguientes variables:
     ```
     MONGODB_URI=tu_conexion_a_mongodb
     JWT_SECRET=clave_secreta_para_jwt
     PORT=5000
     ```
   - Asegúrate de que MongoDB esté en ejecución o utiliza un servicio en la nube como MongoDB Atlas.

5. **Ejecuta el Backend**:
   ```bash
   cd backend
   npm start
   ```

6. **Ejecuta el Frontend**:
   ```bash
   cd frontend
   npm start
   ```

   Esto abrirá la aplicación en el navegador en `http://localhost:3000`.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales: `frontend` y `backend`.

- **frontend/**: Contiene todos los archivos relacionados con el frontend de la aplicación (React).
- **backend/**: Contiene la API y la lógica de backend (Node.js + Express.js).

## Endpoints del Backend

- **GET /api/products**: Obtiene todos los productos del inventario.
- **POST /api/products**: Crea un nuevo producto.
- **PUT /api/products/:id**: Actualiza un producto específico.
- **DELETE /api/products/:id**: Elimina un producto específico.
- **POST /api/auth/register**: Registra un nuevo usuario.
- **POST /api/auth/login**: Inicia sesión con un usuario existente.

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama con tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Agregada nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---
