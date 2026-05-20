
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import DashboardGrid from "../components/DashboardGrid";
import Title from "../components/Title";
import Text from "../components/Text";
import PageHeader from "../components/PageHeader";
import GamificationCard from "../components/GamificationCard";

export const Home = () => {
    return (
        <DashboardContainer>
            <PageHeader title={<Title level="h1"> Bem vindo de volta (nome)</Title>}
                subtitle={<Text size="body">Acompanhe seu progresso e mantenha o foco nos seus objetivos.</Text>}>
            </PageHeader>

            <DashboardGrid>

                <Card size="small">
                    <Title level="h3">Saldo Atual: Valor disponível em conta</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">Total de Entradas vs. Saídas: Comparativo rápido do mês atual.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">Projeção de Saldo: Estimativa de quanto restará até o final do mês considerando as contas fixas cadastradas.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

            </DashboardGrid>
            <DashboardGrid>


                <GamificationCard
                    titulo="Meta de Economia"
                    meta={2000}
                    atual={1250}
                    pontos={150}
                />
                <Card size="medium">
                    <Title level="h3">Top 3 Maiores Gastos: Lista rápida mostrando os maiores desembolsos do período. Isso ajuda a identificar gastos supérfluos recorrentes.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>
            </DashboardGrid>
            <DashboardGrid>

                <Card size="small">
                    <Title level="h3">Economia Acumulada: Quanto o usuário já poupou desde que começou a usar o app.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">Dica ou Alerta de "Desperdício": Um card inteligente que diz, por exemplo: "Você gastou 20% a mais em delivery este mês. Que tal cozinhar em casa?".</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">Projeção de Futuro: "Mantendo esse ritmo, você terminará o mês com R$ X economizados". Isso motiva a continuidade.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

            </DashboardGrid>
        </DashboardContainer>
    );
};