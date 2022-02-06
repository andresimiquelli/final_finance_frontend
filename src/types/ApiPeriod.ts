import ApiEntry from "./ApiEntry";

type ApiPeriod = {
 id: number;
 year: number;
 month: number;
 leftover: number;
 status: string;
 entries: ApiEntry[];
}

export default ApiPeriod;