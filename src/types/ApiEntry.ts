type ApiEntry = {
    id: number;
    title: string;
    description?: string;
    type: string;
    amount: number;
    paid: boolean;
    installment: number;
    installmentTotal: number;
}

export default ApiEntry;