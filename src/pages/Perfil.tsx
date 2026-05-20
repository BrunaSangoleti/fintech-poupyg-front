// src/pages/Home.tsx
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Title from "../components/Title";
import Text from "../components/Text";
import DashboardGrid from "../components/DashboardGrid";
import Button from "../components/Button";
import { useEffect, useState } from 'react';
import axios from 'axios';
import AchievementBadge from "../components/AchievementBadges";


interface Usuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    dataCadastro: string;
}
export const Perfil = () => {
    // 1. Estado para armazenar as conquistas que virão do Java
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [conquistas, setConquistas] = useState([]);

    // 2. Efeito para buscar os dados da API
    useEffect(() => {
        axios.get('http://localhost:8080/api/usuarios/me') 
            .then(res => setUsuario(res.data))
            .catch(err => console.error("Erro ao buscar usuário:", err));
        
        axios.get('http://localhost:8080/api/conquistas') // Endpoint do seu Spring Boot
            .then(response => setConquistas(response.data))
            .catch(error => console.error("Erro ao buscar conquistas:", error));
    }, []);

    return (
        <DashboardContainer>
            <PageHeader
                title={<Title level="h1">Meu Perfil</Title>}
                subtitle={<Text size="body">Gerencie seus dados e preferências de segurança.</Text>}
            />

            <DashboardGrid>

                <Card size="large">
                    <Title level="h3">Suas conquistas até o momento</Title>
                    <div className="achievements-grid">
                        {conquistas.map((c: any) => (
                            <AchievementBadge key={c.id} conquista={c} />
                        ))}
                    </div>
                </Card>


                <Card size="large">
                    <Title level="h3">Dados pessoais:</Title>
                    <Text size="body">
                        <strong>Nome:</strong> {usuario.nome}<br/>
                        <strong>Email:</strong> {usuario.email}<br/>
                        <strong>Telefone:</strong> {usuario.telefone}<br/>
                        <strong>CPF:</strong> {usuario.cpf}<br/>
                        <strong>Membro desde:</strong> {new Date(usuario.dataCadastro).toLocaleDateString()}

                    </Text>
                    <Button tipe="action">Editar</Button>
                </Card>


                <Card size="large">
                    <Title level="h3">Segurança:</Title>
                    <div className="button-container">
                        <Button tipe="action">Trocar senha</Button>
                        <Button tipe="red">Sair</Button>
                    </div>
                </Card>
            </DashboardGrid>
        </DashboardContainer>
    );
};