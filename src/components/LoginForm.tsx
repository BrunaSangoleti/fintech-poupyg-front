import React, { useState } from 'react';
import Button from './Button';
import '../stylesheet/LoginForm.css';

interface LoginFormProps {
    onLogin: (data: any) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e?: React.SyntheticEvent) => {
        if (e) {
            e.preventDefault();
        }
        
        onLogin({ email, password });
    }; // <- Apenas uma chave e ponto-e-vírgula aqui fechando a função handleSubmit

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Senha</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            
            <Button type="action" onClick={() => handleSubmit()}>Entrar</Button>
            
        </form>
    );
};