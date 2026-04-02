import * as model from '../models/movies-model.js'

export async function getMovies (req, res) {
  const movies = await model.getMoviesJson()

  return res.status(200).json(movies)
}

export async function getMovie (req, res) {
  const { imdbID } = req.params

  const movie = await model.getMovieJson(imdbID)

  if (!movie) {
    res.status(404).json('Movie not found.')
  }

  return res.status(200).json(movie)
}

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists
     and continue as described in the assignment */
