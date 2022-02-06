import ApiGroup from "./ApiGroup";

type ApiRecurrency = {
    id: number;
    type: string;
    amount: number;
    title: string;
    description?: string;
    status: string;
    group?: ApiGroup;
}

export default ApiRecurrency;