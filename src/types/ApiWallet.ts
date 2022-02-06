import ApiGroup from "./ApiGroup";
import ApiRecurrency from "./ApiRecurrency";

type ApiWallet = {
    id: number;
    name: string;
    description?: string;
    leftover: number;
    groups: ApiGroup[];
    recurrences: ApiRecurrency[];
}

export default ApiWallet;