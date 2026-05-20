// Login.tsx
import { LoginForm } from '../components/LoginForm';
import Title from '../components/Title';
import '../stylesheet/Login.css';
import Text from '../components/Text';
import PageHeader from '../components/PageHeader';
import { Logo } from '../components/Logo';

export const Login: React.FC = () => {
    const handleLoginSubmit = (data: any) => {
        console.log("Enviando dados do Pupyg:", data);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <Logo size='250px'/>
                <PageHeader title={<Title level='h3'>Bem-vindo ao seu cofrinho digital!</Title>}
                subtitle={<Text size='body'>Faça o login para continuar.</Text>}>
                </PageHeader>

                <LoginForm onLogin={handleLoginSubmit} />
            </div>
        </div>
    );
};