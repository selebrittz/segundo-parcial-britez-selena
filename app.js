import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';
import { Movie } from './src/models/movie.model.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const startServer = async () => {
  await startDB();
  await Movie.sync(); // Sincroniza el modelo con la base de datos
  console.log('Tabla Movie creada o ya existente');
    console.log('Conexión a la base de datos establecida correctamente.');

  app.listen(PORT, async () => {
   console.log(`El server está corriendo en:  http://localhost:${PORT}`);
  });
}

startServer();