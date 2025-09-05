import useFavorites from "../hooks/useFavorites";
import { FaHeart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import './PaginaFavoritos.css';

function PaginaFavoritos() {
  const { favoritos, toggleFavorite } = useFavorites();

  if (favoritos.length === 0)
    return <p>Você ainda não adicionou nenhum filme aos favoritos.</p>;

  return (
    <div className="pagina-favoritos">
      <h1 className="titulo">Meus Favoritos</h1>
      <div className="grid">
        {favoritos.map((filme) => (
          <div key={filme.imdbID} className="filme-card">
            <Link to={`/filme/${filme.imdbID}`}>
              <img
                src={filme.Poster !== "N/A" ? filme.Poster : "https://via.placeholder.com/150"}
                alt={filme.Title}
              />
              <h3 className="filme-titulo">{filme.Title}</h3>
            </Link>

            <button
              onClick={() => toggleFavorite(filme)}
              className="botaoescolher">
              <FaTrash /> Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaginaFavoritos;