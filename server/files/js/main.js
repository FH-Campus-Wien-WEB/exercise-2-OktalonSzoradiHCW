/* eslint-env browser */

// function reverseString (s) {
//   return s.split('').reverse().join('')
// }

function createMovieCard (movie) {
  const movieCard = document.createElement('div')
  movieCard.classList = 'movie'

  const image = document.createElement('img')
  image.classList = 'movie__poster'
  image.src = movie.Poster
  image.alt = `Movie poster for ${movie.Title}`
  movieCard.appendChild(image)

  const movieTitle = document.createElement('h2')
  movieTitle.classList = 'movie__title'
  movieTitle.innerText = movie.Title
  movieCard.appendChild(movieTitle)

  const movieRuntimeAndRelease = document.createElement('span')
  movieRuntimeAndRelease.classList = 'movie__runtime-and-release'
  movieRuntimeAndRelease.innerText = `Runtime: ${movie.Runtime} minutes • Released: ${movie.Released}`
  movieCard.appendChild(movieRuntimeAndRelease)

  const movieGenres = document.createElement('ul')
  movieGenres.classList = 'movie__genres'
  for (const genre of movie.Genres) {
    const movieGenre = document.createElement('li')
    movieGenre.classList = 'movie__genre'
    movieGenre.innerText = `${genre}`
    movieGenres.appendChild(movieGenre)
  }
  movieCard.appendChild(movieGenres)
  // genre.map() could work too

  const movieDescription = document.createElement('p')
  movieDescription.classList = 'movie__description'
  movieDescription.innerText = movie.Plot
  movieCard.appendChild(movieDescription)

  const headerDirectors = document.createElement('h3')
  headerDirectors.innerText = `Director${movie.Directors.length > 1 ? 's' : ''}`
  movieCard.appendChild(headerDirectors)

  const movieDirectors = document.createElement('ul')
  movieDirectors.classList = 'movie__directors'
  for (const director of movie.Directors) {
    const movieDirector = document.createElement('li')
    movieDirector.classList = 'movie__director'
    movieDirector.innerText = `${director}`
    movieDirectors.appendChild(movieDirector)
  }
  movieCard.appendChild(movieDirectors)

  const headerWriters = document.createElement('h3')
  headerWriters.innerText = `Writer${movie.Writers.length > 1 ? 's' : ''}`
  movieCard.appendChild(headerWriters)

  const movieWriters = document.createElement('ul')
  movieWriters.classList = 'movie__writors'
  for (const writer of movie.Writers) {
    const movieWriter = document.createElement('li')
    movieWriter.classList = 'movie__writor'
    movieWriter.innerText = `${writer}`
    movieWriters.appendChild(movieWriter)
  }
  movieCard.appendChild(movieWriters)

  const headerActors = document.createElement('h3')
  headerActors.innerText = `Writer${movie.Actors.length > 1 ? 's' : ''}`
  movieCard.appendChild(headerActors)

  const movieActors = document.createElement('ul')
  movieActors.classList = 'movie__actors'
  for (const actor of movie.Actors) {
    const movieActor = document.createElement('li')
    movieActor.classList = 'movie__actor'
    movieActor.innerText = `${actor}`
    movieActors.appendChild(movieActor)
  }
  movieCard.appendChild(movieActors)

  return movieCard
}

window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const appElement = document.querySelector('#app')
    if (xhr.status === 200) {
      /* Part 2: Build the HTML elements here and append them to the body */
      // appElement.append(reverseString(xhr.responseText))
      // appElement.append(xhr.responseText)

      const response = JSON.parse(xhr.responseText)
      console.log(response)

      const movies = document.querySelector('#movies')

      for (const movie of response) {
        movies.appendChild(createMovieCard(movie))
      }
    } else {
      appElement.append(
        `Data could not be loaded. Status ${xhr.status} - ${xhr.statusText}`
      )
    }
  }
  xhr.open('GET', '/movies')
  xhr.send()
}
