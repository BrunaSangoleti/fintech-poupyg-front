import React, { useState } from 'react';
import '../stylesheet/LoginForm.css';

interface LoginFormProps {
    onLogin: (data: any) => void;
    isLoading?: boolean;
}

export const LoginForm = ({ onLogin, isLoading = false }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e?: React.SyntheticEvent) => {
        if (e) {
            e.preventDefault();
        }
        onLogin({ email, password });
    };

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
                    disabled={isLoading}
                    placeholder="seu@email.com"
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
                    disabled={isLoading}
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                className="btn-login"
                disabled={isLoading}
            >
                {isLoading && <span className="spinner" />}
                {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    );
};