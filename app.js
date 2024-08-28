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

// Middleware to prevent access auth-required routes
function loginRequired(req, res, next) {
  if (!req.session.userId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  };
};

// GET request that returns all movies in db
app.get('/api/movies', async (req, res) => {
  const allMovies = await Movie.findAll();
  res.json(allMovies);
});

// GET request that returns an individual movie's data based on movieId param
app.get('/api/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await Movie.findByPk(movieId);
  res.json(movie);
});

// POST request to log user in (save userId to session) if email exists in db and password matches user with corresponding email
app.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;

  // Query db for user based on email provided in req.body
  const user = await User.findOne({
    where: {email: email},
  });

  // If db returned user based on email, and password matches user's password
  if (user && user.password === password) {
    // save userId to session and return success message
    req.session.userId = user.userId;
    res.json({ success: true });
  } else {
    // otherwise, send failure message
    res.json({ success: false });
  };
});

// POST request to log user out if aready logged in (auth-required)
app.post('/api/logout', loginRequired, (req, res) => {
  // erase session data and send success message
  req.session.destroy();
  res.json({ success: true });
});

// GET request that returns all ratings created by user (auth-required)
app.get('/api/ratings', loginRequired, async (req, res) => {
  // Query db for user based on userId saved in session
  const user = await User.findByPk(req.session.userId);

  // Query db for ratings based on user and add movie title by joining Movie model 
  const ratings = await user.getRatings({
    // Similar to JOIN in SQL (SELECT movie.title, JOIN movies)
    include: {
      model: Movie,
      attributes: ['title'],
    },
  });

  // Responds with query results in JSON format
  res.json(ratings);
});

// POST request to add new rating (auth-required)
app.post('/api/ratings', loginRequired, async (req, res) => {
  const { userId } = req.session;

  const { movieId, score } = req.body;

  // Query db for user
  const user = await User.findByPk(userId);

  // Create new rating in db based on user
  const rating = await user.createRating({
    movieId: movieId,
    score: score,
  });

  // Responds with newly created rating
  res.json(rating);
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));
