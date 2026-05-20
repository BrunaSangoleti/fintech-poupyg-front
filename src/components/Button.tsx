
import '../stylesheet/Button.css';

interface ButtonProps {
    children: any;
    onClick: () => void;
    // Define que o 'variant' só pode ser 'primary' ou 'secondary'
    tipe?: 'red' | 'green' | 'action';
}

const Button = ({ children, onClick, tipe = 'red' }: ButtonProps) => {
    return (
        <button
            className={`btn ${tipe}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;