const BarraProgresso = ({ atual, alvo }: { atual: number, alvo: number }) => {
    const percentual = (atual / alvo) * 100;
    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${percentual}%` }} />
            <span>{percentual.toFixed(0)}% concluído</span>
        </div>
    );
};