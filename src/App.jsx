import { Routes, Route, Link } from 'react-router-dom'
import PaginaBusca from './pages/PaginaBusca'
import PaginaDetalhe from './pages/PaginaDetalhe'
import PaginaFavoritos from './pages/PaginaFavoritos'
import './App.css';

export default function App(){
  return (
    <>
      <nav>
        <Link to="/">Buscar</Link>{" | "}
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PaginaBusca />} />
        <Route path="/filme/:id" element={<PaginaDetalhe />} />
        <Route path="/favoritos" element={<PaginaFavoritos />} />
      </Routes>
    </>
  )
}