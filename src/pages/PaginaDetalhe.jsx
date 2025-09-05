import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/omdb";
import useFavorites from "../hooks/useFavorites";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import './PaginaDetalhe.css';

function PaginaDetalhe() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const { isFavorite, toggleFavorite } = useFavorites();
  
    useEffect(() => {
      async function carregarFilme() {
        setLoading(true);
        setErro("");
        try {
          const dados = await getMovieDetails(id);
          setFilme(dados);
        } catch (err) {
          setErro("Erro ao carregar detalhes do filme.");
        } finally {
          setLoading(false);
        }
      }
  
      carregarFilme();
    }, [id]);
  
    if (loading) return <p>Carregando detalhes...</p>;
    if (erro) return <p className="erro">{erro}</p>;
    if (!filme) return null;
  
    const fav = isFavorite(filme.imdbID);
  
    return (
      <div className="pagina-detalhe">
        <h1>
          {filme.Title} ({filme.Year})
        </h1>
        <img
          src={filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/200"}
          alt={filme.Title}
        />
        <p>
          <strong>Diretor:</strong> {filme.Director}
        </p>
        <p>
          <strong>Atores:</strong> {filme.Actors}
        </p>
        <p>
          <strong>Sinopse:</strong> {filme.Plot}
        </p>
        <p>
          <strong>Avaliação IMDb:</strong> {filme.imdbRating}
        </p>
  
        <button
          onClick={() => toggleFavorite(filme)}
          className={`botao-favorito ${fav ? "botao-favorito-fav" : ""}`}
        >
          {fav ? <FaHeart color="red" /> : <FaRegHeart />}
          {fav ? " Remover dos favoritos" : " Adicionar aos favoritos"}
        </button>
      </div>
    );
}

export default PaginaDetalhe;
