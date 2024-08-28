import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Movie, Rating, User } from './src/model.js';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

app.get('/api/movies', async (req, res) => {
  const allMovies = await Movie.findAll();
  res.json(allMovies);
});

app.get('/api/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await Movie.findByPk(movieId);
  res.json(movie);
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
