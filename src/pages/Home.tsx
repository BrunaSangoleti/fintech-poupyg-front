
import React, { useState, useEffect } from 'react';
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import DashboardGrid from "../components/DashboardGrid";
import Title from "../components/Title";
import Text from "../components/Text";
import PageHeader from "../components/PageHeader";
import iconeInvestimento from '../assets/crescimento.png';
import iconeSaldo from '../assets/excelencia.png';
import iconeReceita from '../assets/dever-de-casa.png';
import iconeGastos from '../assets/ganhar.png';

export const Home = () => {
    const [usuario, setUsuario] = useState<any>(null);
    
    const [receitas, setReceitas] = useState<any[]>([]);
    const [despesas, setDespesas] = useState<any[]>([]);
    const [investimentos, setInvestimentos] = useState<any[]>([]);
    const [erro, setErro] = useState<string | null>(null);

    const getHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`
        };
    };

    const carregarTudo = async () => {
        const usuarioId = localStorage.getItem('usuarioId');
        
        if (!usuarioId) {
            setErro("Usuário não identificado. Faça login novamente.");
            return;
        }

        try {
            setErro(null);

            const endpoints = [
                { url: `https://fintech-poupyg-backend.onrender.com/api/despesa?usuarioId=${usuarioId}`, setter: setDespesas },
                { url: `https://fintech-poupyg-backend.onrender.com/api/investimento?usuarioId=${usuarioId}`, setter: setInvestimentos },
                { url: `https://fintech-poupyg-backend.onrender.com/api/receita?usuarioId=${usuarioId}`, setter: setReceitas }
            ];

            const promessas = endpoints.map(async (item) => {
                try {
                    const response = await fetch(item.url, { headers: getHeaders() });
                    
                    if (!response.ok) {
                        if (response.status === 404) {
                            console.warn(`Recurso não encontrado (404) em: ${item.url}`);
                        } else {
                            console.warn(`Aviso: Falha ao carregar ${item.url} (Status: ${response.status})`);
                        }
                        return { setter: item.setter, dados: [] };
                    }
                    
                    const data = await response.json();
                    return {
                        setter: item.setter,
                        dados: data.content ? data.content : data
                    };
                } catch (innerErr) {
                    console.error(`Erro de conexão em ${item.url}:`, innerErr);
                    return { setter: item.setter, dados: [] };
                }
            });

            const resultados = await Promise.all(promessas);
            resultados.forEach(res => {
                if (res) res.setter(res.dados);
            });

        } catch (err: any) {
            console.error("FALHA CRÍTICA AO CARREGAR:", err);
            setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
        }
    };

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem('usuario');
        const usuarioIdSalvo = localStorage.getItem('usuarioId');
        
        if (usuarioSalvo && usuarioIdSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
            carregarTudo();
        } else {
            window.location.href = '/login'; 
        }
    }, []);

    const totalInvestido = investimentos.reduce((acc, curr) => acc + (Number(curr.valor || curr.price || 0)), 0);
    const totalReceitas = receitas.reduce((acc, curr) => acc + (Number(curr.valor || curr.price || 0)), 0);
    const totalDespesas = despesas.reduce((acc, curr) => acc + (Number(curr.valor || curr.price || 0)), 0);
    
    const saldoAtual = totalReceitas - totalDespesas;

    
    const estiloIcone = {
        width: '36px',
        height: '36px',
        objectFit: 'contain' as const
    };

    
    const estiloHeaderCard = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px'
    };

    return (
        <DashboardContainer>
            {erro && <div style={{ color: 'red', padding: '10px', background: '#ffe6e6', marginBottom: '15px', borderRadius: '4px' }}>{erro}</div>}

            <PageHeader
                title={<Title level="h1">Bem-vindo(a), {usuario?.nome?.split(' ')[0] || "Usuário"}</Title>}
                subtitle={<Text size="body">Acompanhe seu progresso e mantenha o foco.</Text>}
            />

            <DashboardGrid>
                
                <Card size="small">
                    <div style={estiloHeaderCard}>
                        <img src={iconeInvestimento} alt="Ícone Investimento" style={estiloIcone} />
                        <Title level="h3" style={{ margin: 0 }}>Total em Investimentos</Title>
                    </div>
                    <Text size="body">R$ {totalInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                </Card>

                
                <Card size="small">
                    <div style={estiloHeaderCard}>
                        <img src={iconeSaldo} alt="Ícone Saldo" style={estiloIcone} />
                        <Title level="h3" style={{ margin: 0 }}>Saldo Atual</Title>
                    </div>
                    <Text size="body" style={{ color: saldoAtual < 0 ? '#d93025' : 'inherit', fontWeight: 'bold' }}>
                        R$ {saldoAtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </Text>
                </Card>

                
                <Card size="small">
                    <div style={estiloHeaderCard}>
                        <img src={iconeReceita} alt="Ícone Receita" style={estiloIcone} />
                        <Title level="h3" style={{ margin: 0 }}>Total Receitas</Title>
                    </div>
                    <Text size="body">R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                </Card>
            </DashboardGrid>

            <DashboardGrid>
                
                <Card size="large">
                    <div style={estiloHeaderCard}>
                        <img src={iconeGastos} alt="Ícone Gastos" style={estiloIcone} />
                        <Title level="h3" style={{ margin: 0 }}>Top 3 Maiores Gastos</Title>
                    </div>
                    
                    {despesas.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box', marginTop: '10px' }}>
                            {[...despesas]
                                .sort((a, b) => Number(b.valor || b.price || 0) - Number(a.valor || a.price || 0))
                                .slice(0, 3)
                                .map((gasto: any, index: number) => (
                                    <div 
                                        key={index} 
                                        style={{ 
                                            display: 'grid', 
                                            gridTemplateColumns: '1fr auto', 
                                            alignItems: 'center', 
                                            padding: '12px 0', 
                                            borderBottom: '1px solid #eee', 
                                            width: '100%', 
                                            boxSizing: 'border-box' 
                                        }}
                                    >
                                        <Text size="body" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {gasto.descricao || "Sem descrição"}
                                        </Text>
                                        
                                        <Text size="body" style={{ fontWeight: 'bold', paddingLeft: '15px' }}>
                                            R$ {Number(gasto.valor || gasto.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </Text>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <Text size="body">Nenhum gasto registrado.</Text>
                    )}
                </Card>
            </DashboardGrid>
        </DashboardContainer>
    );
};