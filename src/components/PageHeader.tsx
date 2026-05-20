
import '../stylesheet/PageHeader.css';
 


interface PageHeaderProps {
    title: any;    // Aceita qualquer coisa (seu componente Title, texto, etc)
    subtitle?: any; // Aceita qualquer coisa
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <header className="page-header">
            {/* Aqui ele renderiza exatamente o que você passar */}
            {title}
            {subtitle && <div className="subtitle-container">{subtitle}</div>}
        </header>
    );
};

export default PageHeader;