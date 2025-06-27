import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './src/config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

startDB ();

app.listen(PORT, async () => {
  console.log(`El server está corriendo en:  http://localhost:${PORT}`);
});