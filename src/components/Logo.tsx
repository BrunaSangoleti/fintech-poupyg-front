// Exemplo: importando de uma pasta de assets
import logoImage from '../assets/Gemini_Generated_Image_2yamgd2yamgd2yam-removebg-preview.png';
import styles from '../stylesheet/Logo.module.css';

interface LogoProps {
    size?: string; 
}

export const Logo: React.FC<LogoProps> = ({ size = '60px' }) => (
    <div className={styles.container}>
        <img
            src={logoImage}
            alt="Logo Pupyg"
            className={styles.logoImage}
            style={{ width: size, height: 'auto' }}
        />
    </div>
);