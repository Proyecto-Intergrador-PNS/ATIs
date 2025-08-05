# ATIs Project

Este proyecto está compuesto por dos partes principales: un **front-end** desarrollado con React y Vite, y un **back-end** construido con Node.js y Express. A continuación se detallan la estructura del proyecto, las bases de datos, dependencias, librerías utilizadas y las instrucciones básicas para su uso y despliegue.

---

## Estructura de Carpetas

```
ATIs/
│
├── front-end/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── public/
│   │   └── vite.svg
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── main.jsx
│       ├── assets/
│       │   └── react.svg
│       ├── components/
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Login.css
│       │   └── Login.jsx
│       └── utils/
│           ├── ProtectedRoutes.jsx
│           └── Root.jsx
│
└── server/
    ├── index.js
    ├── package.json
    ├── seed.js
    ├── controllers/
    │   └── authController.js
    ├── db/
    │   └── connection.js
    ├── models/
    │   └── User.js
    └── routes/
        └── auth.js
```

---

## Descripción General

- **front-end/**: Aplicación cliente desarrollada en React, gestionada con Vite para un desarrollo rápido y eficiente.
- **server/**: API RESTful construida con Node.js y Express, encargada de la autenticación y gestión de usuarios.

---

## Base de Datos

- **Tipo:** MongoDB
- **Ubicación de la conexión:** `server/db/connection.js`
- **Modelo principal:** `User.js` en `server/models/`
- **Seed de datos:** `server/seed.js` para poblar la base de datos con usuarios de ejemplo.

### Estructura de la colección `users`

| Campo    | Tipo   | Requerido | Único | Descripción                                                    |
| -------- | ------ | --------- | ----- | -------------------------------------------------------------- |
| name     | String | No        | No    | Nombre del usuario                                             |
| email    | String | Sí        | Sí    | Correo electrónico (login)                                     |
| password | String | Sí        | No    | Contraseña hasheada                                            |
| address  | String | No        | No    | Dirección del usuario                                          |
| role     | String | No        | No    | Rol del usuario (`admin` o `customer`), por defecto `customer` |

---

## Dependencias y Librerías

### Front-end

- **React**: Librería principal para la construcción de interfaces de usuario.
- **Vite**: Herramienta de build y desarrollo rápido para proyectos frontend.
- **react-router-dom**: Para el manejo de rutas en la SPA.
- **Context API**: Para la gestión de autenticación y estado global.
- **Otras**: ESLint para linting, CSS para estilos.

### Back-end

- **Express**: Framework para la creación de servidores HTTP.
- **Mongoose**: ODM para interactuar con MongoDB.
- **bcryptjs**: Para el hasheo de contraseñas.
- **jsonwebtoken**: Para la autenticación basada en tokens JWT.
- **dotenv**: Para la gestión de variables de entorno.

---

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### 2. Instalar dependencias

- **Front-end:**
  ```bash
  cd front-end
  npm install
  ```
- **Back-end:**
  ```bash
  cd server
  npm install
  ```

### 3. Configurar variables de entorno

- Crear un archivo `.env` en `server/` con la cadena de conexión de MongoDB y otras variables necesarias.

### 4. Poblar la base de datos (opcional)

```bash
cd server
node seed.js
```

### 5. Ejecutar el servidor

```bash
cd server
npm start
```

### 6. Ejecutar el front-end

```bash
cd front-end
npm run dev
```

---

## Notas Adicionales

- El sistema de rutas protegidas se encuentra en `front-end/src/utils/ProtectedRoutes.jsx`.
- El contexto de autenticación está en `front-end/src/context/AuthContext.jsx`.
- El login y la gestión de usuarios se realiza mediante JWT.
- El back-end expone rutas de autenticación en `server/routes/auth.js`.

---

## Desarrollador por el Grupo La Niña, La Pinta y La Santa María
