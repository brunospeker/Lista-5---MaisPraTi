import axios from 'axios'

const BASE_URL = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export async function searchMovies(term, page = 1) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: term, page, type: 'movie' }
    })
    if (data.Response === 'False') {
      return { movies: [], totalResults: 0, error: data.Error }
    }
    return { movies: data.Search, totalResults: Number(data.totalResults) }
  } catch (err) {
    throw err
  }
}

export async function getMovieDetails(imdbID) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, i: imdbID, plot: 'full' }
    })
    if (data.Response === 'False') throw new Error(data.Error)
    return data
  } catch (err) {
    throw err
  }
}
