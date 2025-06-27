import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';
import { Movie } from './src/models/movie.model.js';
import movieRoutes from './src/routes/movie.routes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use("/api/movies", movieRoutes);

const startServer = async () => {
  await startDB();
  await Movie.sync(); 
  console.log('Tabla Movie creada');
  console.log('Conexión a la base de datos establecida correctamente.');

  app.listen(PORT, () => {
    console.log(`El server está corriendo en:  http://localhost:${PORT}`);
  });
}

startServer();