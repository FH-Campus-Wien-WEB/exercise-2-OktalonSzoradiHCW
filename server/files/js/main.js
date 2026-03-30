/* eslint-env browser */

/**
 * @typedef {Object} Movie
 * @property {string} Title
 * @property {string} Released
 * @property {number | string} Runtime
 * @property {string[]} Genres
 * @property {string[]} Directors
 * @property {string[]} Writers
 * @property {string[]} Actors
 * @property {string} Plot
 * @property {string} Poster
 * @property {number} Metascore
 * @property {number} imdbRating
 */

/**
 * Creates an HTML element with optional class names and text content.
 *
 * @param {keyof HTMLElementTagNameMap} tag - The HTML tag name (e.g. 'div', 'p', 'img').
 * @param {string} [classList] - Optional CSS class(es) to assign.
 * @param {string} [innerText] - Optional text content (ignored if falsy).
 * @returns {HTMLElementTagNameMap[keyof HTMLElementTagNameMap]} The created element.
 */
function createHtmlElement (tag, classList, innerText) {
  const element = document.createElement(tag)
  if (classList) element.className = classList
  if (innerText) element.innerText = innerText
  return element
}

/**
 * Creates a <ul> element populated with <li> items.
 *
 * @param {string[]} items - List of text items to render.
 * @param {string} listClass - CSS class for the <ul>.
 * @param {string} itemClass - CSS class for each <li>.
 * @returns {HTMLUListElement} The generated unordered list.
 */
function createList (items, listClass, itemClass) {
  const ul = document.createElement('ul')
  ul.className = listClass

  // for (const item of items) {
  //   const li = createHtmlElement('li', itemClass, item)
  //   ul.appendChild(li)
  // }

  ul.append(...items.map(item => createHtmlElement('li', itemClass, item)))

  return ul
}

/**
 * Creates a section consisting of a header (<h3>) and a list.
 *
 * @param {string} title - Base title for the section (e.g. "Director").
 * @param {string[]} items - Items to include in the list.
 * @param {string} listClass - CSS class for the <ul>.
 * @param {string} itemClass - CSS class for each <li>.
 * @returns {DocumentFragment} A fragment containing the header and list.
 */
function createSection (title, items, listClass, itemClass) {
  const fragment = document.createDocumentFragment()

  const header = createHtmlElement(
    'h3',
    null,
    `${title}${items.length > 1 ? 's' : ''}`
  )

  const list = createList(items, listClass, itemClass)

  fragment.appendChild(header)
  fragment.appendChild(list)

  return fragment
}

/**
 * Creates a complete movie card list item element.
 *
 * @param {Movie} movie - Movie data used to populate the card.
 * @returns {HTMLLIElement} An <li> element containing the movie card.
 */
function createMovieCard (movie) {
  const li = createHtmlElement('li', 'movies__li')
  const movieCard = createHtmlElement('article', 'movie')
  li.appendChild(movieCard)

  const imageWrapper = createHtmlElement('picture', 'movie__poster-area')
  const image = createHtmlElement('img', 'movie__poster')
  image.src = movie.Poster
  image.alt = `Movie poster for ${movie.Title}`
  imageWrapper.appendChild(image)

  const title = createHtmlElement('h2', 'movie__title', movie.Title)

  const meta = createHtmlElement(
    'span',
    'movie__runtime-and-release',
    /* eslint-disable no-irregular-whitespace */
    `Runtime: ${movie.Runtime} minutes • ` +
      `Released: ${movie.Released} • ` +
      `${movie.Metascore ? `Metascore: ${movie.Metascore} • ` : ''}` +
      `IMDb Rating: ${movie.imdbRating}`
    /* eslint-enable no-irregular-whitespace */
  )

  const genres = createList(movie.Genres, 'movie__genres', 'movie__genre')

  const description = createHtmlElement('p', 'movie__description', movie.Plot)

  movieCard.append(
    imageWrapper,
    title,
    meta,
    genres,
    description,
    createSection(
      'Director',
      movie.Directors,
      'movie__directors',
      'movie__director'
    ),
    createSection('Writer', movie.Writers, 'movie__writers', 'movie__writer'),
    createSection('Actor', movie.Actors, 'movie__actors', 'movie__actor')
  )

  return li
}

window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const movies = document.querySelector('#movies')
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText)
      for (const movie of response) {
        movies.appendChild(createMovieCard(movie))
      }
    } else {
      movies.classList = 'movies movies__error'
      movies.append(
        createHtmlElement('h2', null, `${xhr.status} • ${xhr.statusText}`),
        'Could not GET /movies'
      )
      console.error('Could not GET /movies', xhr)
    }
  }
  xhr.open('GET', '/movies')
  xhr.send()
}
