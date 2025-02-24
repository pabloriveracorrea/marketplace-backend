import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import supertest from 'supertest';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Middleware para autenticación
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Registro de usuario
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: 'Usuario registrado con éxito', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });
    
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(401).json({ error: 'Contraseña incorrecta' });
    
    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, user: user.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Obtener productos (ruta protegida)
app.get('/products', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Pruebas con Supertest
if (process.env.NODE_ENV === 'test') {
  const request = supertest(app);
  (async () => {
    const response = await request.get('/products').set('Authorization', 'Bearer fake_token');
    console.log('Prueba de autenticación:', response.statusCode === 403 ? 'Exitosa' : 'Fallida');
  })();
}

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});