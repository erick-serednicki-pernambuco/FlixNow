import { useEffect, useState } from "react";
import "./App.css";
import { Home } from "./pages/home/Home";
import { Film } from "./models/Film";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Perfil from "./pages/perfil/Perfil";
import Layout from "./components/Layout";
import DetalhesFilme from "./components/movieCard/DetalhesFilme";
import Login from "./pages/login/Login";
import RecuperarSenha from "./pages/login/ReuerarSenha";

export type PopularFilms = {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
};

export default function App() {
  const [onPerfil, setOnPerfil] = useState<boolean>(false);
    const [logado, setLogado] = useState(false);


  function estadoPerfil(event: any) {
    setOnPerfil(true);
  };
    function handleLogout(event: any) {
      setLogado(false);
    }

  return (
    <div className="central">
    <BrowserRouter>
      <Routes>
     
        
        <Route
          path="/"
          
        >      
         
          <>
            <Route
             element={<Layout estadoPerfil={estadoPerfil} onPerfil={onPerfil} onLogout={handleLogout}/>}
             >
              <Route path="inicio" element={<Home />} />
            </Route>
          </>
          <Route path="login" element={<Login />} />
          <Route path="recuperar" element={<RecuperarSenha />} />

          {!onPerfil ? (
            <>
              <Route path="/" element={<Navigate to="login" replace />} />
            </>
          ) : (
            <Route path="perfil" element={<Perfil />} />
            )}
        <Route path="detalhes/:id" element={ <DetalhesFilme/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
</div>
  );
}
