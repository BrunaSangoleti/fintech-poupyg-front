import React, { useState, useEffect } from 'react';
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import DashboardGrid from "../components/DashboardGrid";
import Title from "../components/Title";
import Text from "../components/Text";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import Modal from '../components/Modal';

    export const Movimentacoes = () => {
    const [transacoes, setTransacoes] = useState<any[]>([]);
    const [saldo, setSaldo] = useState(0);
    const [error, setError] = useState<string | null>(null);

    
    const [modalConfig, setModalConfig] = useState({ 
        open: false, 
        endpoint: '', 
        label: '', 
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
            const [resReceitas, resDespesas] = await Promise.all([
                fetch(`http://localhost:8080/api/receita?usuarioId=${usuarioId}`, { headers: getHeaders() }).then(r => r.json()),
                fetch(`http://localhost:8080/api/despesa?usuarioId=${usuarioId}`, { headers: getHeaders() }).then(r => r.json())
            ]);

            const listaReceitas = resReceitas.content ? resReceitas.content : resReceitas;
            const listaDespesas = resDespesas.content ? resDespesas.content : resDespesas;

            const lista = [
                ...listaReceitas.map((i: any) => ({ ...i, tipo: 'receita' })),
                ...listaDespesas.map((i: any) => ({ ...i, tipo: 'despesa' }))
            ];
            setTransacoes(lista);

            const totalReceitas = listaReceitas.reduce((acc: number, curr: any) => acc + (Number(curr.valor) || 0), 0);
            const totalDespesas = listaDespesas.reduce((acc: number, curr: any) => acc + (Number(curr.valor) || 0), 0);

            setSaldo(totalReceitas - totalDespesas);
        } catch (error) {
            console.error("Erro ao carregar dados do extrato:", error);
            setError("Não foi possível carregar o histórico de movimentações.");
        }
    };

    const salvarEdicao = async (item: any) => {
        const usuarioId = localStorage.getItem('usuarioId');
        try {
            const response = await fetch(`http://localhost:8080/api/${item.tipo}/${item.id}`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({
                    id: item.id,
                    descricao: descricaoEdicao,
                    valor: Number(valorEdicao),
                    usuario: { codigo: Number(usuarioId) } 
                })
            });

            if (!response.ok) throw new Error("Falha na atualização do backend");

            setEditandoId(null);
            carregarDados(); 
        } catch (error) {
            console.error("Erro ao editar:", error);
            alert("Erro ao salvar alteração.");
        }
    };

    const deletarMovimentacao = async (id: number, tipo: string) => {
        if (window.confirm("Deseja realmente excluir este item?")) {
            try {
                const response = await fetch(`http://localhost:8080/api/${tipo}/${id}`, { 
                    method: 'DELETE',
                    headers: getHeaders()
                });
                if (!response.ok) throw new Error("Falha ao deletar no backend");
                carregarDados();
            } catch (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao excluir registro.");
            }
        }
    };

    useEffect(() => { carregarDados(); }, []);

    return (
        <DashboardContainer>
            <PageHeader
                title={<Title level="h1">Minhas movimentações</Title>}
                subtitle={<Text size="body">Registre suas receitas e despesas.</Text>}
            />

            {error && <Text size="body" style={{ color: 'red', marginBottom: '20px' }}>{error}</Text>}

            <DashboardGrid>
                <Card size="small">
                    <Title level="h3">Novo registro</Title>
                    
                    {/* 2. AJUSTE: Botões agora passam a propriedade 'placeholder' correspondente */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <Button tipe='green' onClick={() => setModalConfig({ 
                            open: true, 
                            endpoint: 'receita', 
                            label: 'Receita', 
                            placeholder: 'Ex: Salário / Renda extra' 
                        })}>Nova Receita</Button>
                        
                        <Button tipe='red' onClick={() => setModalConfig({ 
                            open: true, 
                            endpoint: 'despesa', 
                            label: 'Despesa', 
                            placeholder: 'Ex: Conta de luz / Cartão de crédito' 
                        })}>Nova Despesa</Button>
                    </div>

                    {/* 3. AJUSTE: Repassando o placeholder do estado para a nova prop do Modal */}
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
                    <Title level="h3">Saldo total</Title>
                    <Text size="body" style={{ fontSize: '24px', fontWeight: 'bold', color: saldo >= 0 ? 'green' : 'red' }}>
                        {`R$ ${saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </Text>
                </Card>
            </DashboardGrid>

            <DashboardGrid>
                <Card size="large">
                    <Title level="h2">Histórico recente</Title>
                    {transacoes.length > 0 ? (
                        transacoes.map((item) => (
                            <div
                                key={`${item.tipo}-${item.id}`}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px 0',
                                    borderBottom: '1px solid #0b0a0aff',
                                    alignItems: 'center'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: '15px' }}>
                                    {editandoId === item.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={descricaoEdicao}
                                                onChange={(e) => setDescricaoEdicao(e.target.value)}
                                                style={{ fontWeight: 'bold', padding: '6px', borderRadius: '4px', border: '1px solid #090909ff', width: '60%' }}
                                                placeholder="Descrição"
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
                                            <span style={{ color: item.tipo === 'receita' ? 'green' : 'red', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                                {item.tipo === 'receita' ? '+' : '-'} R$ {Number(item.valor || 0).toFixed(2)}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <span style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
                                    {editandoId === item.id ? (
                                        <Button tipe="green" onClick={() => salvarEdicao(item)}>Salvar</Button>
                                    ) : (
                                        <Button
                                            tipe="blue"
                                            onClick={() => { 
                                                setEditandoId(item.id); 
                                                setDescricaoEdicao(item.descricao || ""); 
                                                setValorEdicao(item.valor || 0); 
                                            }}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                    <Button tipe="red" onClick={() => deletarMovimentacao(item.id, item.tipo)}>Excluir</Button>
                                </span>
                            </div>
                        ))
                    ) : (
                        <Text size="body">Nenhuma transação encontrada.</Text>
                    )}
                </Card>
            </DashboardGrid>
        </DashboardContainer>
    );
};