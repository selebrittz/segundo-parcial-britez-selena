import { Movie } from '../models/movie.model.js';

// Obtener todas las películas
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener películas' });
  }
};

// Obtener una película por ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la película' });
  }
};

// Crear una nueva película
export const createMovie = async (req, res) => {
  try {
    const { title, director, duration, genre, description } = req.body;
    if (!title || !director || !duration || !genre)
      return res.status(400).json({ message: 'Campos obligatorios incompletos' });

    const exists = await Movie.findOne({ where: { title } });
    if (exists)
      return res.status(400).json({ message: 'Ya existe una película con ese título' });

    const movie = await Movie.create({ title, director, duration, genre, description });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear película' });
  }
};

// Actualizar una película existente
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, director, duration, genre, description } = req.body;

    const movie = await Movie.findByPk(id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    if (!title || !director || !duration || !genre)
      return res.status(400).json({ message: 'Campos obligatorios incompletos' });

    const duplicate = await Movie.findOne({ where: { title } });
    if (duplicate && duplicate.id != id)
      return res.status(400).json({ message: 'Título duplicado' });

    await movie.update({ title, director, duration, genre, description });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar película' });
  }
};

// Eliminar una película
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Película no encontrada' });

    await movie.destroy();
    res.status(200).json({ message: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar película' });
  }
};
