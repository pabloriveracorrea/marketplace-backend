# marketplace-backend
# Backend - Marketplace

Este es el backend del proyecto Marketplace. Proporciona una API para gestionar la base de datos y la lógica del negocio.

## 📌 Requisitos previos

Antes de ejecutar el backend, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [MySQL](https://www.mysql.com/) u otro motor de base de datos compatible

## 🚀 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/pabloriveracorrea/marketplace-backend.git
   ```
2. Entra en la carpeta del proyecto:
   ```bash
   cd marketplace-backend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## ⚙️ Configuración

1. Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias (según el archivo `.env` de ejemplo en el repositorio).
2. Configura la base de datos importando el archivo `database.sql` en tu servidor MySQL:
   ```sql
   SOURCE database.sql;
   ```

## ▶️ Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para iniciar el servidor en producción:
```bash
npm start
```

## 📡 Endpoints

Los endpoints del backend estarán documentados en un archivo adicional o en Postman.

## 🛠 Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- Dotenv (para variables de entorno)

---

📌 **IMPORTANTE:** Si tienes problemas con la conexión a la base de datos, revisa que las credenciales en `.env` sean correctas y que MySQL esté corriendo.

Si necesitas más ayuda, revisa la documentación oficial o contacta al equipo de desarrollo. 🚀

