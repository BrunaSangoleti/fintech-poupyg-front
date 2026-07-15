import '../stylesheet/Card.css'


interface CardProps {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large'; 
}

const Card = ({ children, size = 'small' }: CardProps) => {
    return (
        <div className={`card ${size}`}>
            {children}
        </div>
    );
};

export default Card;