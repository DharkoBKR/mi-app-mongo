const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Conectar a MongoDB Atlas
// La base de datos se especifica en la cadena de conexión después de .net/
mongoose.connect("mongodb+srv://Dharko:ciD4KSdlfp7ZOIhi@dharko.i3bcvui.mongodb.net/big-data?retryWrites=true&w=majority")
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Definir esquema y modelo
const languageSchema = new mongoose.Schema({
  language: { type: String, required: true },
  focus: { type: String, required: true },
  popular_libraries: [String]
});

// La colección se especifica en el segundo argumento de mongoose.model
const Language = mongoose.model('ias-bd', languageSchema);

// Ruta para obtener todos los lenguajes IA
app.get('/languages', async (req, res) => {
  try {
    const languages = await Language.find();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor está corriendo en puerto 3000");
});