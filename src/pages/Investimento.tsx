
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import DashboardGrid from "../components/DashboardGrid";
import Title from "../components/Title";
import Text from "../components/Text";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from 'react';

import Button from "../components/Button";

import Modal from "../components/Modal";


export const Investimento = () => {
    const [investimentos, setInvestimentos] = useState<any[]>([]);
    const [totalPatrimonio, setTotalPatrimonio] = useState(0);
    const [error, setError] = useState<string | null>(null);
    
    
    const [modalConfig, setModalConfig] = useState({ 
        open: false, 
        endpoint: 'investimento', 
        label: 'Investimento',
        placeholder: ''
    });

    
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [descricaoEdicao, setDescricaoEdicao] = useState("");
    const [valorEdicao, setValorEdicao] = useState<number | string>("");

    
    const getHeaders = (includeJson = false) => {
        const token = localStorage.getItem('token');
        const headers: Record<string, string> = {
            'Authorization': `Bearer ${token}`
        };
        if (includeJson) {
            headers['Content-Type'] = 'application/json';
        }
        return headers;
    };

    const carregarDados = async () => {
        const usuarioId = localStorage.getItem('usuarioId');
        
        if (!usuarioId) {
            setError("Usuário não identificado. Faça login novamente.");
            return;
        }

        try {
            setError(null);
            
            const response = await fetch(`https://fintech-poupyg-backend.onrender.com/api/investimento?usuarioId=${usuarioId}`, {
                headers: getHeaders()
            });
            const data = await response.json();
            
            const listaInvestimentos = data.content ? data.content : data;
            setInvestimentos(listaInvestimentos);
            
            const total = listaInvestimentos.reduce((acc: number, curr: any) => acc + (Number(curr.valor) || 0), 0);
            setTotalPatrimonio(total);
        } catch (error) {
            console.error("Erro ao carregar investimentos:", error);
            setError("Não foi possível carregar o histórico de investimentos.");
        }
    };

    const salvarEdicaoInvestimento = async (item: any) => {
        const usuarioId = localStorage.getItem('usuarioId');
        try {
            const response = await fetch(`https://fintech-poupyg-backend.onrender.com/api/investimento/${item.id}`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({ 
                    id: item.id, 
                    descricao: descricaoEdicao, 
                    valor: Number(valorEdicao),
                    
                    usuario: { codigo: Number(usuarioId) }
                })
            });

            if (!response.ok) throw new Error("Falha ao atualizar investimento no servidor");

            setEditandoId(null);
            carregarDados();     
        } catch (error) {
            console.error("Erro ao editar:", error);
            alert("Erro ao salvar alteração no banco de dados.");
        }
    };

    const deletarInvestimento = async (id: number) => {
        if (window.confirm("Deseja realmente excluir este investimento?")) {
            try {
                const response = await fetch(`https://fintech-poupyg-backend.onrender.com/api/investimento/${id}`, { 
                    method: 'DELETE',
                    headers: getHeaders()
                });

                if (!response.ok) throw new Error("Falha ao deletar investimento");

                carregarDados();
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao excluir investimento.");
            }
        }
    };

    useEffect(() => { carregarDados(); }, []);

    return (
        <DashboardContainer>
            <PageHeader 
                title={<Title level="h1">Meus investimentos</Title>} 
                subtitle={<Text size="body">Gerencie seus ativos e acompanhe seu patrimônio.</Text>} 
            />

            {error && <Text size="body" style={{ color: 'red', marginBottom: '20px' }}>{error}</Text>}

            <DashboardGrid>
                <Card size="small">
                    <Title level="h3">Novo ativo</Title>
                    
                    <Button type='green' onClick={() => setModalConfig({ 
                        open: true, 
                        endpoint: 'investimento', 
                        label: 'Investimento',
                        placeholder: 'Ex: Carro dos sonhos / Viagem'
                    })}>
                        Adicionar Ativo
                    </Button>
                    <Modal
                        isOpen={modalConfig.open}
                        onClose={() => setModalConfig({ ...modalConfig, open: false })}
                        endpoint={modalConfig.endpoint}
                        tipoTransacao={modalConfig.label}
                        placeholderDescricao={modalConfig.placeholder}
                        onSuccess={carregarDados}
                    />
                </Card>

                <Card size="small">
                    <Title level="h3">Patrimônio Total</Title>
                    <Text size="body" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}>
                        {`R$ ${totalPatrimonio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </Text>
                </Card>
            </DashboardGrid>

            <DashboardGrid>
                <Card size="large">
                    <Title level="h2">Histórico de Investimentos</Title>
                    {investimentos.length > 0 ? (
                        investimentos.map((item) => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #070707ff', alignItems: 'center' }}>
                                
                                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '15px' }}>
                                    {editandoId === item.id ? (
                                        <>
                                            <input 
                                                type="text"
                                                value={descricaoEdicao} 
                                                onChange={(e) => setDescricaoEdicao(e.target.value)} 
                                                style={{ fontWeight: 'bold', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '60%' }}
                                                placeholder="Nome do ativo"
                                            />
                                            <input 
                                                type="number"
                                                value={valorEdicao} 
                                                onChange={(e) => setValorEdicao(e.target.value)} 
                                                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc', width: '25%', fontWeight: 'bold' }}
                                                placeholder="Valor (R$)"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <span style={{ fontWeight: 'bold', minWidth: '150px', color: '#333' }}>
                                                {item.descricao || "Sem descrição"}
                                            </span>
                                            <span style={{ color: '#2196F3', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                                R$ {Number(item.valor || 0).toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                
                                <span style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
                                    {editandoId === item.id ? (
                                        <Button type="green" onClick={() => salvarEdicaoInvestimento(item)}>Salvar</Button>
                                    ) : (
                                        <Button 
                                            type="action" 
                                            onClick={() => { 
                                                setEditandoId(item.id); 
                                                setDescricaoEdicao(item.descricao || ""); 
                                                setValorEdicao(item.valor || 0); 
                                            }}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                    <Button type="red" onClick={() => deletarInvestimento(item.id)}>Excluir</Button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <Text size="body">Nenhum investimento registrado.</Text>
                    )}
                </Card>
            </DashboardGrid>
        </DashboardContainer>
    );
};