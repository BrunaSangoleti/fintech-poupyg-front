
import React from 'react'; 
import '../stylesheet/Title.css';


interface TitleProps {
    children: any;
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; 
    style?: React.CSSProperties; 
}


const Title = ({ children, level = 'h1', style }: TitleProps) => {
    const Tag = level;

    return (
        
        <Tag className={`title ${level}`} style={style}>
            {children}
        </Tag>
    );
};

export default Title;