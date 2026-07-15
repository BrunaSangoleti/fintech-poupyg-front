
import '../stylesheet/Button.css';

interface ButtonProps {
    children: any;
    onClick: () => void;
    
    type?: 'red' | 'green' | 'action';
}

const Button = ({ children, onClick, type = 'red' }: ButtonProps) => {
    return (
        <button
            className={`btn ${type}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;