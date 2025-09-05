import { useState } from "react";
import axios from "axios";
import CartaoFilme from "../components/CartaoFilme";
import { FaSearch, FaSpinner } from "react-icons/fa";
import './PaginaBusca.css';

function PaginaBusca() {
  const [termo, setTermo] = useState("");
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  async function buscarFilmes(e) {
    e.preventDefault();
    if (!termo.trim()) return;
    setLoading(true);
    setErro(null);
    try {
      const resposta = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${termo}&type=movie`
      );
      if (resposta.data.Response === "True") {
        setFilmes(resposta.data.Search);
      } else {
        setErro(resposta.data.Error);
        setFilmes([]);
      }
    } catch (err) {
      setErro("Erro ao buscar filmes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pagina-busca">
      <h1>Busca de Filmes</h1>

      <form onSubmit={buscarFilmes} className="form-busca">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">
          {loading ? <FaSpinner className="spin" /> : <FaSearch />}
          Buscar
        </button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      <div className="grid-filmes">
        {filmes.map((filme) => (
          <CartaoFilme key={filme.imdbID} filme={filme} />
        ))}
      </div>
    </div>
  );
}

export default PaginaBusca;
