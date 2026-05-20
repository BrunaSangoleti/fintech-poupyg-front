
import '../stylesheet/AchievementBadges.css';

// Importando a interface para garantir que o TS saiba o que é uma conquista
interface Conquista {
    id: number;
    nome: string;
    descricao: string;
    icone: string;
    desbloqueado: boolean;
}

interface AchievementBadgeProps {
    conquista: Conquista;
}

const AchievementBadge = ({ conquista }: AchievementBadgeProps) => {
    return (
        <div className={`achievement-badge ${conquista.desbloqueado ? 'unlocked' : 'locked'}`}>
            <div className="badge-icon">{conquista.icone}</div>
            <div className="badge-info">
                <h4>{conquista.nome}</h4>
                <p>{conquista.descricao}</p>
            </div>
        </div>
    );
};

export default AchievementBadge;