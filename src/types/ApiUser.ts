import ApiWallet from "./ApiWallet";

type ApiUser = {
    id: number;
    name: string;
    email: string;
    status: string;
    levels: string[];
    wallets: ApiWallet[];
}

export default ApiUser;