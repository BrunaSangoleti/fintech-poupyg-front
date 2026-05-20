// src/pages/Home.tsx
import Card from "../components/card";
import DashboardContainer from "../components/DashboardContainer";
import DashboardGrid from "../components/DashboardGrid";
import Title from "../components/Title";
import Text from "../components/Text";
import PageHeader from "../components/PageHeader";

export const Investimento = () => {
    return (
        <DashboardContainer>
            <PageHeader title={<Title level="h1"> Meus investimentos</Title>}
            subtitle={<Text size="body">Gerencie seus ativos e veja seu patrimônio crescer.</Text>}>
            </PageHeader>
            
            <DashboardGrid>
                <Card size="small">
                    <Title level="h3">Patrimônio Total: Valor acumulado somando todos os ativos.</Title>
                    <Text size="body">R$ 5.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">Rentabilidade do Período: (Ex: "Rendimento no Mês: +1,2%").</Title>
                    <Text size="body">R$ 12.000,00</Text>
                </Card>

                <Card size="small">
                    <Title level="h3">"Investidor nível 5" (mostra progresso).</Title>
                    <Text size="body">Total: R$ 17.000,00</Text>
                </Card>
            </DashboardGrid>
            <DashboardGrid>
                <Card size="medium">
                    <Title level="h3">Gráfico de Pizza (Donut): Porcentagem alocada em cada classe de ativos (Ex: 40% Renda Fixa, 30% Ações, 20% Fundos Imobiliários, 10% Cripto).
                    </Title>
                </Card>
                <Card size="medium">
                    <Title level="h3">Simulador de Juros Compostos: "Se você investir mais R$ 200 este mês, terá R$ X a mais em 5 anos".
                    </Title>
                </Card>
            </DashboardGrid>
            <DashboardGrid>
                <Card size="large">
                    <Title level="h3"> Extrato e detalhamento dos investimentos</Title>
                </Card>
            </DashboardGrid>

        </DashboardContainer>
    );
};