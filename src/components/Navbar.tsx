import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../stylesheet/Navbar.css'
import logoImage from '../assets/Gemini_Generated_Image_2yamgd2yamgd2yam-removebg-preview.png';

interface NavItem {
    name: string;
    path: string;
}


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Movimentações', path: '/movimentacoes'},
        { name: 'Investimentos', path: '/investimento' },
        { name: 'Meu Perfil', path: '/perfil' },
        { name: 'Fale conosco', path: '/suporte' },
    ];

    const fecharMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/home" onClick={fecharMenu}>
                    <img src={logoImage} alt="Logo da Fintech" />
                </Link>
            </div>

            {/* Botão hamburger — visível apenas em mobile */}
            <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(prev => !prev)}
                aria-label="Abrir menu de navegação"
                aria-expanded={menuOpen}
            >
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
            </button>

            <ul className={menuOpen ? 'menu-open' : ''}>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                            onClick={fecharMenu}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
