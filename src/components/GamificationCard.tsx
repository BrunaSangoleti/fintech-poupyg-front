
import '../stylesheet/GamificationCard.css';

interface GamificationCardProps {
    titulo: string;
    meta: number;
    atual: number;
    pontos: number;
}

const GamificationCard = ({ titulo, meta, atual, pontos }: GamificationCardProps) => {
    const percentual = Math.min((atual / meta) * 100, 100);

    return (
        <div className="gamification-card">
            <div className="card-header">
                <h3>{titulo}</h3>
                <span className="badge-pontos">+{pontos} pts</span>
            </div>

            <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${percentual}%` }} />
            </div>

            <p className="progress-text">
                R$ {atual.toLocaleString('pt-BR')} de R$ {meta.toLocaleString('pt-BR')}
            </p>
        </div>
    );
};

export default GamificationCard;