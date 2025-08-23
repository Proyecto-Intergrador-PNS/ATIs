# ATIs Project

Este proyecto es un sistema completo de gestión de inventario, ventas y compras, compuesto por dos partes principales: un **front-end** desarrollado con React + Vite y un **back-end** construido con Node.js, Express y MongoDB. Incluye autenticación JWT, gestión de usuarios y roles, administración de productos, proveedores, categorías, órdenes de compra y ventas, así como dashboards y reportes.

A continuación se detallan la estructura, modelos, endpoints, dependencias y las instrucciones para su despliegue y uso.

---

## Estructura de Carpetas

```
ATIs/
│
├── front-end/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── assets/
│       ├── components/
│       │   ├── Categories.jsx
│       │   ├── DashboardSummary.jsx
│       │   ├── Orders.jsx
│       │   ├── Products.jsx
│       │   ├── Profile.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Suppliers.jsx
│       │   └── Users.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   └── ProfilePage.jsx
│       └── utils/
│           ├── ProtectedRoutes.jsx
│           └── Root.jsx
│
└── server/
    ├── index.js
    ├── package.json
    ├── seed.js
    ├── db/
    │   └── connection.js
    ├── controllers/
    │   ├── AuthController.js
    │   ├── UserController.js
    │   ├── productController.js
    │   ├── categoryController.js
    │   ├── supplierController.js
    │   ├── orderController.js
    │   ├── saleController.js
    │   └── ProfileController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── User.js
    │   ├── Product.js
    │   ├── Category.js
    │   ├── Supplier.js
    │   ├── Order.js
    │   └── Sale.js
    └── routes/
        ├── auth.js
        ├── user.js
        ├── product.js
        ├── category.js
        ├── supplier.js
        ├── order.js
        ├── sale.js
        └── profile.js
```

---

## Descripción General

- **front-end/**: SPA en React + Vite. Permite login, gestión de usuarios, productos, proveedores, categorías, órdenes de compra, ventas y perfil. Incluye dashboard con resumen de inventario y finanzas.
- **server/**: API RESTful en Node.js + Express + MongoDB. Provee endpoints para autenticación, usuarios, productos, proveedores, categorías, órdenes, ventas y perfil. Seguridad con JWT y roles.

---

## Modelos de Base de Datos (MongoDB)

- **Ubicación de la conexión:** `server/db/connection.js`
- **Seed de datos:** `server/seed.js` para poblar la base de datos con usuarios de ejemplo.

### users

| Campo    | Tipo   | Requerido | Único | Descripción                                                    |
| -------- | ------ | --------- | ----- | -------------------------------------------------------------- |
| name     | String | No        | No    | Nombre del usuario                                             |
| email    | String | Sí        | Sí    | Correo electrónico (login)                                     |
| password | String | Sí        | No    | Contraseña hasheada                                            |
| address  | String | No        | No    | Dirección del usuario                                          |
| role     | String | No        | No    | Rol del usuario (`admin` o `customer`), por defecto `customer` |

### products

| Campo    | Tipo     | Requerido | Descripción            |
| -------- | -------- | --------- | ---------------------- |
| name     | String   | Sí        | Nombre del producto    |
| category | ObjectId | Sí        | Referencia a categoría |
| supplier | ObjectId | Sí        | Referencia a proveedor |
| price    | Number   | Sí        | Precio unitario        |
| stock    | Number   | Sí        | Stock disponible       |

### categories

| Campo               | Tipo   | Requerido | Descripción         |
| ------------------- | ------ | --------- | ------------------- |
| categoryName        | String | Sí        | Nombre de categoría |
| categoryDescription | String | Sí        | Descripción         |

### suppliers

| Campo     | Tipo   | Requerido | Descripción          |
| --------- | ------ | --------- | -------------------- |
| name      | String | Sí        | Nombre del proveedor |
| email     | String | Sí        | Email del proveedor  |
| number    | String | Sí        | Teléfono             |
| address   | String | Sí        | Dirección            |
| createdAt | Date   | No        | Fecha de registro    |

### orders

| Campo     | Tipo     | Requerido | Descripción        |
| --------- | -------- | --------- | ------------------ |
| product   | ObjectId | Sí        | Producto comprado  |
| quantity  | Number   | Sí        | Cantidad comprada  |
| price     | Number   | Sí        | Precio unitario    |
| user      | ObjectId | Sí        | Usuario que compra |
| createdAt | Date     | No        | Fecha de la orden  |

### sales

| Campo     | Tipo     | Requerido | Descripción                  |
| --------- | -------- | --------- | ---------------------------- |
| products  | Array    | Sí        | [{product, quantity, price}] |
| total     | Number   | Sí        | Total de la venta            |
| user      | ObjectId | Sí        | Usuario que vende            |
| createdAt | Date     | No        | Fecha de la venta            |

---

## Dependencias y Librerías

### Herramientas Necesarias

- **Docker**: Para levantar MongoDB fácilmente.
- **MongoDB**: Base de datos principal.
- **MongoCompass**: Visualización de la base de datos.

### Instalación de MongoDB con Docker

```bash
docker run -d --name mongoDB -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin123 -v mongodata:/data/db mongo
```

> **Nota:** Si cambias usuario/contraseña, actualiza también el archivo `.env` en `server/`.

### Front-end

- **React**
- **Vite**
- **react-router-dom**
- **Context API**
- **Axios**
- **Tailwind CSS**
- **ESLint**

### Back-end

- **Express**
- **Mongoose**
- **bcrypt**
- **jsonwebtoken**
- **dotenv**
- **cors**
- **nodemon**

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

- Crear un archivo `.env` en `server/` con la cadena de conexión de MongoDB y otras variables necesarias:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `PORT`

### 4. Crear el usuario Admin en la base de datos

```bash
cd server
node --env-file=.env seed.js
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

## Funcionalidades Principales

### Front-end

- Login y autenticación JWT
- Dashboard con resumen de inventario, ventas, compras y balance
- Gestión CRUD de usuarios (solo admin)
- Gestión CRUD de productos, proveedores y categorías
- Registro de órdenes de compra y ventas
- Edición de perfil de usuario
- Rutas protegidas según rol (admin/customer)
- UI moderna y responsiva (Tailwind CSS)

### Back-end

- API RESTful con rutas protegidas por JWT y roles
- Endpoints para usuarios, productos, proveedores, categorías, órdenes, ventas y perfil
- Validaciones y manejo de errores
- Hash de contraseñas y seguridad básica

#### Principales Endpoints

- `POST   /api/auth/login` — Login de usuario
- `GET    /api/users` — Listar usuarios (admin)
- `POST   /api/users` — Crear usuario (admin)
- `PUT    /api/users/:id` — Editar usuario (admin)
- `DELETE /api/users/:id` — Eliminar usuario (admin)
- `GET    /api/product` — Listar productos
- `POST   /api/product/add` — Crear producto
- `PUT    /api/product/:id` — Editar producto
- `DELETE /api/product/:id` — Eliminar producto
- `GET    /api/category` — Listar categorías
- `POST   /api/category/add` — Crear categoría
- `PUT    /api/category/:id` — Editar categoría
- `DELETE /api/category/:id` — Eliminar categoría
- `GET    /api/supplier` — Listar proveedores
- `POST   /api/supplier/add` — Crear proveedor
- `PUT    /api/supplier/:id` — Editar proveedor
- `DELETE /api/supplier/:id` — Eliminar proveedor
- `GET    /api/orders` — Listar órdenes de compra
- `POST   /api/orders` — Registrar compra
- `GET    /api/sales` — Listar ventas
- `POST   /api/sales` — Registrar venta
- `GET    /api/profile` — Obtener perfil
- `PUT    /api/profile` — Editar perfil

---

## Notas Adicionales

- El sistema de rutas protegidas está en `front-end/src/utils/ProtectedRoutes.jsx`.
- El contexto de autenticación está en `front-end/src/context/AuthContext.jsx`.
- El login y la gestión de usuarios se realiza mediante JWT.
- El back-end expone rutas RESTful en `server/routes/`.
- El dashboard y reportes están en `front-end/src/components/DashboardSummary.jsx`.

---

## Desarrollado por el Grupo La Niña, La Pinta y La Santa María

- Full-stack: 604740958 Ricardo Contreras
- Front-End: 604790176 Kenneth Campos Soto
- Front-End: 604640651  Reychell Espinoza Hernández
- Back-End and main lead: 604870859 Ansley Osvaldo Sánchez Aragón
