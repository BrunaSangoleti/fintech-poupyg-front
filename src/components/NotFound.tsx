import { useNavigate } from 'react-router-dom';
import '../stylesheet/NotFound.css';
import Title from './Title';
import Button from './Button';
export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-content">
                <Title level='h1'>Ops! O cofrinho não está aqui</Title>
                <Title level='h3'>Não encontramos a página que você procura, mas não se preocupe: seus dados estão seguros e o caminho de volta é logo abaixo.</Title>
                

                <Button tipe='action' onClick={() => navigate('/home')}>
                    Voltar para o Dasboard
                </Button>
            </div>
        </div>
    );
};