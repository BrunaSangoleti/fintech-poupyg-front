
import '../stylesheet/Title.css';

// 1. Define os tipos aceitos para o 'level' e para as props
interface TitleProps {
    children: any;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Limita as opções para tags válidas
}

// 2. Aplica a interface no componente
const Title = ({ children, level = 'h1' }: TitleProps) => {
    const Tag = level;

    return (
        <Tag className={`title ${level}`}>
            {children}
        </Tag>
    );
};

export default Title;