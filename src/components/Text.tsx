
import React from 'react';
import '../stylesheet/Text.css';

interface TextProps {
    children: any;
    size?: 'body' | 'small' | 'highlight';
    
    style?: React.CSSProperties; 
}


const Text = ({ children, size = 'body', style }: TextProps) => {
    return (
        
        <p className={`text ${size}`} style={style}>
            {children}
        </p>
    );
};

export default Text;