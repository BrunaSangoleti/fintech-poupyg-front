export interface Usuario {
    codigo?: number;
    email: string;
    senha?: string; // opcional no front por segurança
    cpf: string;
    nome: string;
    telefone: string;
}

export interface ItemFinanceiro {
    id?: number;
    descricao: string;
    valor: number;
}

// Como os atributos são iguais, podemos usar a mesma estrutura para os três
export type Despesa = ItemFinanceiro;
export type Investimento = ItemFinanceiro;
export type Receita = ItemFinanceiro;