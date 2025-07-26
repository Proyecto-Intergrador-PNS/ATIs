# ATIs Project

Este proyecto es una aplicación web compuesta por un front-end en React y un back-end en Node.js/Express. El objetivo principal es gestionar autenticación y roles de usuario (admin y customer/employee), permitiendo el acceso a diferentes dashboards según el tipo de usuario.

## Tecnologías Utilizadas

### Front-end

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **Vite**: Herramienta de desarrollo y build para proyectos modernos de front-end.
- **React Router**: Para la navegación entre páginas.
- **Context API**: Para la gestión del estado de autenticación.
- **ESLint**: Para el linting del código JavaScript.

### Back-end

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para la creación de APIs REST.
- **MongoDB**: Base de datos NoSQL (se asume por la estructura, aunque puede variar).

## Requerimientos

- Node.js >= 14.x
- npm >= 6.x
- (Opcional) MongoDB para la base de datos

## Instalación y Ejecución

1. **Clonar el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd atis-last
   ```

2. **Instalar dependencias del front-end:**

   ```bash
   cd front-end
   npm install
   ```

3. **Instalar dependencias del back-end:**

   ```bash
   cd ../server
   npm install
   ```

4. **Configurar variables de entorno:**

   - Crear un archivo `.env` en la carpeta `server` con las variables necesarias (por ejemplo, URI de la base de datos, claves secretas, etc).

5. **Ejecutar el back-end:**

   ```bash
   node index.js
   ```

6. **Ejecutar el front-end:**
   ```bash
   cd ../front-end
   npm run dev
   ```

## Estructura del Proyecto

```
front-end/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   └── Root.jsx
  │   ├── context/
  │   │   └── AuthContext.jsx
  │   ├── App.jsx
  │   └── main.jsx
  ├── package.json
  └── vite.config.js

server/
  ├── controllers/
  │   └── authController.js
  ├── db/
  │   └── connection.js
  ├── models/
  │   └── User.js
  ├── routes/
  │   └── auth.js
  ├── index.js
  ├── package.json
  └── seed.js
```

## Descripción General

- **front-end/**: Contiene la aplicación React, componentes, contexto de autenticación y configuración de Vite.
- **server/**: Contiene la API REST en Express, modelos de datos, controladores, rutas y conexión a la base de datos.

## Roles y Autenticación

El sistema maneja autenticación de usuarios y redirección según el rol:

- **admin**: Acceso a `/admin/dashboard`
- **customer/employee**: Acceso a `/employee/dashboard`
- Usuarios no autenticados: Redirección a `/login`

---

Para más detalles, consulta los archivos `README.md` en cada subcarpeta o el código fuente.
