import { Link, NavLink } from 'react-router-dom';
import '../stylesheet/Navbar.css'
import logoImage from '../assets/Gemini_Generated_Image_2yamgd2yamgd2yam-removebg-preview.png';

interface NavItem {
    name: string;
    path: string;
}


export const Navbar = () => {

    const navItems: NavItem[] = [
        { name: 'Dashboard', path: '/home' },
        { name: 'Movimentações', path: '/movimentacoes'},
        { name: 'Investimentos', path: '/investimento' },
        { name: 'Meu Perfil', path: '/perfil' },
        { name: 'Fale conosco', path: '/suporte' },
        
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/home">
                    <img src={logoImage} alt="Logo da Fintech" />
                </Link>
            </div>
            <ul>
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
