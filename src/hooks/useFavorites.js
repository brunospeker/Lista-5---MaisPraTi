import { useState, useEffect } from "react"

const CHAVE_LOCAL = "meus_favoritos"

export default function useFavorites() {
  const [favoritos, setFavoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CHAVE_LOCAL)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CHAVE_LOCAL, JSON.stringify(favoritos))
  }, [favoritos])

  const isFavorite = (imdbID) => favoritos.some(f => f.imdbID === imdbID)

  const addFavorite = (filme) => {
    setFavoritos((prev) => {
      if (prev.some(f => f.imdbID === filme.imdbID)) return prev
      return [filme, ...prev]
    })
  }

  const removeFavorite = (imdbID) => {
    setFavoritos((prev) => prev.filter(f => f.imdbID !== imdbID))
  }

  const toggleFavorite = (filme) => {
    isFavorite(filme.imdbID) ? removeFavorite(filme.imdbID) : addFavorite(filme)
  }

  return { favoritos, addFavorite, removeFavorite, isFavorite, toggleFavorite }
}
