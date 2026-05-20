
import '../stylesheet/Text.css';

interface TextProps {
    children: any;
    size?: 'body' | 'small' | 'highlight'; 
}

const Text = ({ children, size = 'body' }: TextProps) => {
    return (
        <p className={`text ${size}`}>
            {children}
        </p>
    );
};

export default Text;