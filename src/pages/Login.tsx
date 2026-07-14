
import React from 'react';
import { LoginForm } from '../components/LoginForm';
import Title from '../components/Title';
import '../stylesheet/Login.css';
import Text from '../components/Text';
import PageHeader from '../components/PageHeader';
import { Logo } from '../components/Logo';

import { useNavigate } from 'react-router-dom'; 

export const Login: React.FC = () => {
    const navigate = useNavigate(); 
    const handleLoginSubmit = async (data: any, event?: any) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        try {
            const API_URL = 'https://fintech-poupyg-backend.onrender.com/api/usuarios/login';

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    senha: data.senha || data.password 
                }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    alert("E-mail ou senha incorretos.");
                    return;
                }
                if (response.status === 404) {
                    alert("Serviço de autenticação não encontrado (Erro 404). Verifique a URL da API.");
                    return;
                }
                if (response.status >= 500) {
                    alert("Erro interno no servidor. Tente novamente mais tarde.");
                    return;
                }
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const responseData = await response.json();

            
            localStorage.setItem('token', responseData.token);
            
            
            localStorage.setItem('usuarioId', responseData.id);
            
            
            localStorage.setItem('usuario', JSON.stringify(responseData));

            
            navigate('/home');

        } catch (error) {
            console.error("Erro na autenticação:", error);
            alert("Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente.");
        }
    };

    return (
        <div className="login-container">
            
            <div className="login-box">
                <Logo size='250px' />
                <PageHeader
                    title={<Title level='h3'>Bem-vindo ao seu cofrinho digital!</Title>}
                    subtitle={<Text size='body'>Faça o login para continuar.</Text>}
                />
                <div className="card-aviso-login">
    <p>💡 Acesso :</p>
    
    <div className="credenciais-teste-box">
        <span>
            <strong>E-mail:</strong> frieren@email.com
        </span>
        <span>
            <strong>Senha:</strong> senha123
        </span>
    </div>
</div>

                <LoginForm onLogin={handleLoginSubmit} />
            </div>
        </div>
    );
};