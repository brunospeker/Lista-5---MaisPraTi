import useFavorites from '../hooks/useFavorites'
import { Link } from "react-router-dom"
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './CartaoFilme.css';


function CartaoFilme({ filme }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const fav = isFavorite(filme.imdbID);
  
    return (
      <div className="cartao-filme">
        <img src={filme.Poster} alt={filme.Title} />
        <h3>{filme.Title} ({filme.Year})</h3>
        <button onClick={() => toggleFavorite(filme)}>
            {fav ? <FaHeart color="red" /> : <FaRegHeart />}
            {fav ? ' Remover dos favoritos' : ' Adicionar aos favoritos'}
        </button>
        <Link to={`/filme/${filme.imdbID}`}>Detalhes</Link>
      </div>
    );
  }

export default CartaoFilme;