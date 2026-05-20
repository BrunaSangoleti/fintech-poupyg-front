import Card from "../components/card"
import DashboardContainer from "../components/DashboardContainer"
import DashboardGrid from "../components/DashboardGrid"
import Title from "../components/Title"
import Text from "../components/Text"
import Button from "../components/Button"
import PageHeader from "../components/PageHeader"


export const Movimentacoes =()=>{
    return(
        <DashboardContainer>
            
            <PageHeader title={<Title level="h1">Minhas movimentações</Title>}
            subtitle={<Text size="body">Registre suas receitas e despesas para manter seu orçamento em dia.</Text>}>
                
                
            </PageHeader>
            
            <DashboardGrid>
                <Card size="small">
                    <Title level="h3">Novo registro</Title>
                    <Button tipe="green" > + Nova receita</Button>
                    <Button tipe="red"> - Nova despesa</Button>

                </Card>
                <Card size="small">
                    <Title level="h3"> Filtros </Title>
                    <Button tipe="action">Mês</Button>
                    <Button tipe="action">Categoria</Button>
                </Card>
                <Card size="small"><Title level="h3">Saldo total do mês</Title>
                <Text size="body">R$ 5.000,00</Text>
                </Card>

            </DashboardGrid>
            <DashboardGrid>
                <Card size="large">
                    <Title level="h2">
                        Histórico recente
                    </Title>

                </Card>
            </DashboardGrid>
        
        
        </DashboardContainer>
    )
}