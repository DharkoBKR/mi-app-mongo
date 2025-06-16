// app.js

const { MongoClient } = require('mongodb');

// URI de conexión a tu base de datos MongoDB
// Por defecto, MongoDB corre en localhost:27017
const uri = 'mongodb://localhost:27017';
const dbName = 'miBaseDeDatosVSCode'; // El nombre de la base de datos que usaremos

async function main() {
  const client = new MongoClient(uri);

  try {
    // Conectarse al servidor de MongoDB
    await client.connect();
    console.log('Conectado exitosamente al servidor de MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('documentosEjemplo');

    // --- Operaciones CRUD ---

    // 1. Insertar un documento
    console.log('\n--- Insertando documento ---');
    const insertResult = await collection.insertOne({
      nombre: 'Artículo de Ejemplo',
      autor: 'Autor NodeJS',
      fecha: new Date(),
      tags: ['node', 'mongo', 'vscode'],
    });
    console.log('Documento insertado con ID:', insertResult.insertedId);

    // 2. Buscar documentos
    console.log('\n--- Buscando documentos ---');
    const findResult = await collection.find({ autor: 'Autor NodeJS' }).toArray();
    console.log('Documentos encontrados:', findResult);

    // 3. Actualizar un documento
    console.log('\n--- Actualizando documento ---');
    const updateResult = await collection.updateOne(
      { nombre: 'Artículo de Ejemplo' }, // Criterio de búsqueda
      { $set: { estado: 'publicado' } } // Actualización
    );
    console.log('Documentos actualizados:', updateResult.modifiedCount);

    // 4. Eliminar un documento (opcional, cuidado al usarlo)
    // Descomenta para probar la eliminación
    /*
    console.log('\n--- Eliminando documento ---');
    const deleteResult = await collection.deleteOne({ nombre: 'Artículo de Ejemplo' });
    console.log('Documentos eliminados:', deleteResult.deletedCount);
    */

  } catch (err) {
    console.error('Error al conectar o realizar operaciones:', err);
  } finally {
    // Asegurarse de cerrar la conexión
    await client.close();
    console.log('\nConexión a MongoDB cerrada.');
  }
}

// Ejecuta la función principal
main().catch(console.error);