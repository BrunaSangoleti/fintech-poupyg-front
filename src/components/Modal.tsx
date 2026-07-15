
import '../stylesheet/Modal.css';
import { useState } from 'react';
import Button from "../components/Button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    endpoint: string;
    tipoTransacao: string;
    onSuccess: () => void;
    placeholderDescricao?: string;
}

const Modal = ({ isOpen, onClose, endpoint, tipoTransacao, onSuccess, placeholderDescricao }: ModalProps) => {
    const [formData, setFormData] = useState({ descricao: '', valor: '' });

    const handleSalvar = async () => {
        const usuarioId = localStorage.getItem('usuarioId');
        const token = localStorage.getItem('token');

        if (!usuarioId) {
            alert("Sessão expirada ou usuário não identificado. Faça login novamente.");
            return;
        }

        try {
            const response = await fetch(`https://fintech-poupyg-backend.onrender.com/api/${endpoint}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    descricao: formData.descricao,
                    valor: parseFloat(formData.valor),
                    usuario: { codigo: Number(usuarioId) }
                })
            });

            if (response.ok) {
                alert(`${tipoTransacao} registrada com sucesso!`);
                setFormData({ descricao: '', valor: '' });
                onSuccess();
                onClose();
            } else {
                alert("Erro ao salvar: " + response.statusText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com o servidor. Verifique o console.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            {/* O container agora usa puramente as classes CSS, sem estilos inline poluindo */}
            <div className="modal">
                {/* Ajuste dinâmico do artigo de gênero (Novo vs Nova) */}
                <h2>{tipoTransacao === 'Investimento' ? 'Novo' : 'Nova'} {tipoTransacao}</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                    <label>Descrição:</label>
                    <input
                        type="text"
                        placeholder={placeholderDescricao || "Ex: Digite uma descrição"}
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    />

                    <label>Valor:</label>
                    <input
                        type="number"
                        placeholder="R$ 0,00 "
                        value={formData.valor}
                        onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                    />
                </div>

                <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                    <Button type='action' onClick={handleSalvar}>Salvar</Button>
                    <Button type='action' onClick={onClose}>Cancelar</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;