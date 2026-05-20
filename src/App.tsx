import './App.css'
import './index.css'

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { Investimento } from './pages/Investimento';
import { Movimentacoes } from './pages/Movimentacoes';
import Layout from './components/Layout';
import { NotFound } from './components/NotFound';
import { Login } from './pages/Login';
import NavbarHide from './components/NavbarHide';



// 1. Criamos um componente que contém a lógica de navegação
const AppContent = () => {
    const location = useLocation();

    // Lista de rotas onde a Navbar NÃO deve aparecer
    const routesWithoutNavbar = ['/login'];

    // Verifica se a rota atual é "/login" ou se é uma rota inexistente ("*")
    // Nota: o NotFound (path="*") não aparece no location.pathname, 
    // então verificamos se a rota atual é uma das rotas permitidas.
    const isExcludedRoute = routesWithoutNavbar.includes(location.pathname);
    const isNotFound = !['/', '/movimentacoes', '/investimento', '/perfil', '/login'].includes(location.pathname);

    return (
        <>
            {/* Só renderiza se NÃO for login e NÃO for uma página inexistente */}
            {!isExcludedRoute && !isNotFound && <Navbar />}

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/movimentacoes" element={<Movimentacoes />} />
                    <Route path="/investimento" element={<Investimento />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

// 2. O App.tsx apenas inicializa o Router
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
export default App
