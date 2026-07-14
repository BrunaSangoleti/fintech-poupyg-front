// src/pages/Home.tsx
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Title from "../components/Title";
import Text from "../components/Text";
import DashboardGrid from "../components/DashboardGrid";
import Button from "../components/Button";
import { useEffect, useState } from 'react';

import AchievementBadge from "../components/AchievementBadges";
import { useNavigate } from 'react-router-dom';



interface Usuario {
    codigo: number; 
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataCadastro: string;
}

export const Perfil = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [conquistas, setConquistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [isEditandoPerfil, setIsEditandoPerfil] = useState(false);
    const [nomeEdicao, setNomeEdicao] = useState("");
    const [emailEdicao, setEmailEdicao] = useState("");
    const [telefoneEdicao, setTelefoneEdicao] = useState("");

    const [isEditandoSenha, setIsEditandoSenha] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

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
            setError("Usuário não identificado. Por favor, faça login novamente.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            
            const [userRes, conquistasRes] = await Promise.all([
                fetch(`http://localhost:8080/api/usuarios/${usuarioId}`, {
                    headers: getHeaders()
                })
                .then(r => {
                    if (!r.ok) throw new Error(`Status ${r.status}`);
                    return r.json();
                })
                .catch(err => {
                    console.error("Erro ao buscar usuário no Oracle:", err);
                    return null;
                }),
                fetch('http://localhost:8080/api/conquistas', {
                    headers: getHeaders()
                })
                .then(r => {
                    if (!r.ok) throw new Error(`Status ${r.status}`);
                    return r.json();
                })
                .catch(err => {
                    console.error("Erro ao buscar conquistas:", err);
                    return [];
                })
            ]);

            if (userRes) {
                setUsuario(userRes);
            } else {
                setError("Não foi possível carregar os dados do banco. Verifique o console do Java.");
            }
            
            setConquistas(conquistasRes && conquistasRes.content ? conquistasRes.content : conquistasRes);

        } catch (err) {
            console.error("Erro crítico no Perfil:", err);
            setError("Não foi possível carregar as informações.");
        } finally {
            setLoading(false);
        }
    };

    const salvarPerfil = async () => {
        if (!usuario) return;

        try {
            
            const response = await fetch(`http://localhost:8080/api/usuarios/${usuario.codigo}`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({
                    ...usuario, 
                    nome: nomeEdicao,
                    email: emailEdicao,
                    telefone: telefoneEdicao
                })
            });

            if (!response.ok) throw new Error("Falha ao atualizar dados no servidor");

            setIsEditandoPerfil(false);
            carregarDados(); 
        } catch (err) {
            console.error("Erro ao atualizar perfil:", err);
            alert("Erro ao salvar alterações do perfil.");
        }
    };

    const salvarNovaSenha = async () => {
        if (!usuario) return;

        if (novaSenha !== confirmarNovaSenha) {
            alert("A nova senha e a confirmação não coincidem!");
            return;
        }

        try {
            
            const response = await fetch(`https://fintech-poupyg-backend.onrender.com/api/usuarios/${usuario.codigo}/senha`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify({
                    senhaAtual: senhaAtual,
                    novaSenha: novaSenha
                })
            });

            if (!response.ok) throw new Error("Senha atual incorreta ou falha no servidor");

            alert("Senha alterada com sucesso!");
            limparCamposSenha();
        } catch (err) {
            console.error("Erro ao alterar senha:", err);
            alert("Erro ao modificar a senha.");
        }
    };

    const limparCamposSenha = () => {
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarNovaSenha("");
        setIsEditandoSenha(false);
    };

    useEffect(() => { carregarDados(); }, []);

    if (loading) return <DashboardContainer><Text size="body">Carregando perfil...</Text></DashboardContainer>;

    return (
        <DashboardContainer>
            <PageHeader
                title={<Title level="h1">Meu Perfil</Title>}
                subtitle={<Text size="body">Gerencie seus dados e preferências de segurança.</Text>}
            />

            {error && <Text size="body" style={{ color: 'red', marginBottom: '20px' }}>{error}</Text>}

            <DashboardGrid>
                <Card size="large">
                    <Title level="h3">Suas conquistas até o momento</Title>
                    <div className="achievements-grid" style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                        {conquistas.length > 0 ? (
                            conquistas.map((c: any) => (
                                <AchievementBadge key={c.id} conquista={c} />
                            ))
                        ) : (
                            <Text size="body">Nenhuma conquista disponível.</Text>
                        )}
                    </div>
                </Card>

                <Card size="large">
                    <Title level="h3">Dados pessoais:</Title>
                    {usuario ? (
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {isEditandoPerfil ? (
                                <>
                                    <label style={{ fontWeight: 'bold' }}>Nome:</label>
                                    <input type="text" value={nomeEdicao} onChange={(e) => setNomeEdicao(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                    
                                    <label style={{ fontWeight: 'bold' }}>Email:</label>
                                    <input type="email" value={emailEdicao} onChange={(e) => setEmailEdicao(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                    
                                    <label style={{ fontWeight: 'bold' }}>Telefone:</label>
                                    <input type="text" value={telefoneEdicao} onChange={(e) => setTelefoneEdicao(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                    
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                        <Button tipe="green" onClick={salvarPerfil}>Salvar</Button>
                                        <Button tipe="blue" onClick={() => setIsEditandoPerfil(false)}>Cancelar</Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Text size="body">
                                        <strong>Código do Usuário:</strong> {usuario.codigo}<br />
                                        <strong>Nome:</strong> {usuario.nome}<br />
                                        <strong>Email:</strong> {usuario.email}<br />
                                        <strong>Telefone:</strong> {usuario.telefone}<br />
                                        <strong>CPF:</strong> {usuario.cpf}<br />
                                        <strong>Membro desde:</strong> {usuario.dataCadastro ? new Date(usuario.dataCadastro).toLocaleDateString() : 'N/A'}
                                    </Text>
                                    <div style={{ marginTop: '10px' }}>
                                        <Button tipe="blue" onClick={() => {
                                            setIsEditandoPerfil(true);
                                            setNomeEdicao(usuario.nome);
                                            setEmailEdicao(usuario.email);
                                            setTelefoneEdicao(usuario.telefone || "");
                                        }}>Editar Dados</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Text size="body">Dados não encontrados.</Text>
                    )}
                </Card>

                <Card size="large">
                    <Title level="h3">Segurança:</Title>
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {isEditandoSenha ? (
                            <>
                                <label style={{ fontWeight: 'bold' }}>Senha Atual:</label>
                                <input type="password" value={senhaAtual} onChange={(e) => setSenhaAtual(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                
                                <label style={{ fontWeight: 'bold' }}>Nova Senha:</label>
                                <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                
                                <label style={{ fontWeight: 'bold' }}>Confirmar Nova Senha:</label>
                                <input type="password" value={confirmarNovaSenha} onChange={(e) => setConfirmarNovaSenha(e.target.value)} style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                
                                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                    <Button tipe="green" onClick={salvarNovaSenha}>Atualizar Senha</Button>
                                    <Button tipe="blue" onClick={limparCamposSenha}>Cancelar</Button>
                                </div>
                            </>
                        ) : (
                            <div className="button-container" style={{ display: 'flex', gap: '10px' }}>
                                <Button tipe="blue" onClick={() => setIsEditandoSenha(true)}>Trocar senha</Button>
                                <Button tipe="red" onClick={() => {
                                    localStorage.clear(); 
                                    navigate('/');
                                }}>Sair</Button>
                            </div>
                        )}
                    </div>
                </Card>
            </DashboardGrid>
        </DashboardContainer>
    );
};