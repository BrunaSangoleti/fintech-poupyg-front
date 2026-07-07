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




const AppContent = () => {
    const location = useLocation();


    const routesWithoutNavbar = ['/'];


    const isNotFound = !['/', '/home', '/movimentacoes', '/investimento', '/perfil'].includes(location.pathname);


    const isExcludedRoute = routesWithoutNavbar.includes(location.pathname);

    return (
        <>

            {!isExcludedRoute && !isNotFound && <Navbar />}

            <Routes>

                <Route path="/" element={<Login />} />


                <Route element={<Layout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/movimentacoes" element={<Movimentacoes />} />
                    <Route path="/investimento" element={<Investimento />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Route>


                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};


function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
export default App
