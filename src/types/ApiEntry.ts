import ApiGroup from "./ApiGroup";
import ApiRecurrency from "./ApiRecurrency";

type ApiEntry = {
    id: number;
    type: string;
    amount: number;
    title: string;
    description?: string;
    installment?: number;
    totalInstallments?: number;
    paid: boolean;
    group?: ApiGroup;
    recurrency?: ApiRecurrency;
    created_at?: string;
    updated_at?: string;
}

export default ApiEntry;