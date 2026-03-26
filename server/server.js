const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const movieModel = require('./movie-model.js')

const movies = require('./movies.json')

const app = express()

// Parse urlencoded bodies
app.use(bodyParser.json())

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')))

// Configure a 'get' endpoint for all movies..
app.get('/movies', function (req, res) {
  const omdbData = movies.map(
    ({
      Title,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Poster,
      Metascore,
      imdbRating
    }) => ({
      Title,
      Released: new Date(Released).toLocaleDateString('en-CA'),
      Runtime: Number.parseInt(Runtime),
      Genres: Genre.split(', '),
      Directors: Director.split(', '),
      Writers: Writer.split(', '),
      Actors: Actors.split(', '),
      Plot,
      Poster,
      Metascore: Number(Metascore),
      imdbRating: Number(imdbRating)
    })
  )
  res.send(omdbData)
  /* Task 1.2. Remove the line below and eturn the movies from
     the model as an array */
  // res.sendStatus(404)
})

// Configure a 'get' endpoint for a specific movie
app.get('/movies/:imdbID', function (req, res) {
  /* Task 2.1. Remove the line below and add the
    functionality here */
  res.sendStatus(404)
})

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists
     and continue as described in the assignment */

app.listen(3000)

console.log('Server now listening on http://localhost:3000/')
