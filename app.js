// app.js

const { MongoClient } = require('mongodb');
const express = require('express'); // <-- Nuevo: Importa Express
const app = express(); // <-- Nuevo: Inicializa Express

// Configuración para Railway y local
const PORT = process.env.PORT || 3000; // Usa el puerto de Railway o 3000 localmente
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'miBaseDeDatosVSCode'; // El nombre de la base de datos que usaremos

let dbClient; // Para almacenar la conexión al cliente de MongoDB

// Conectar a MongoDB
async function connectToMongo() {
  try {
    dbClient = new MongoClient(MONGODB_URI);
    await dbClient.connect();
    console.log('Conectado exitosamente al servidor de MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1); // Salir si no se puede conectar a la BD
  }
}

// Middleware para parsear JSON
app.use(express.json());

// --- Rutas de la API (Ejemplos) ---

// Ruta Home
app.get('/', (req, res) => {
  res.send('¡Mi aplicación Node.js con MongoDB está corriendo en Railway!');
});

// Ruta para insertar un documento
app.post('/documentos', async (req, res) => {
  try {
    if (!dbClient) {
      return res.status(500).send('No conectado a la base de datos.');
    }
    const collection = dbClient.db(DB_NAME).collection('documentosEjemplo');
    const document = { ...req.body, fecha: new Date() };
    const result = await collection.insertOne(document);
    res.status(201).json({ message: 'Documento insertado', id: result.insertedId });
  } catch (error) {
    console.error('Error al insertar documento:', error);
    res.status(500).send('Error interno del servidor al insertar.');
  }
});

// Ruta para obtener todos los documentos
app.get('/documentos', async (req, res) => {
  try {
    if (!dbClient) {
      return res.status(500).send('No conectado a la base de datos.');
    }
    const collection = dbClient.db(DB_NAME).collection('documentosEjemplo');
    const documentos = await collection.find({}).toArray();
    res.json(documentos);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).send('Error interno del servidor al obtener.');
  }
});

// Iniciar el servidor
async function startServer() {
  await connectToMongo(); // Conectar a MongoDB antes de iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}

startServer().catch(console.error);