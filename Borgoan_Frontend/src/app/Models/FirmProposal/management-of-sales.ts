import { Addressinfo } from '../PersonalProposal/addressinfo';

export class ManagementOfSalesInformation {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    AGENT_NAME: string;
    IS_SHOWROOM_OR_DEPO_OWNED:boolean=false;
    SHOWROOM_OR_DEPO_ADDRESS_ID:number;
    IS_SALE_DIRECT_TO_CUSTOMER:boolean=false;
    CUSTOMER_DETAILS: string;
    IS_EXPORT_SALES:boolean=false;
    EXPORT_DETAILS: string;
    BUSINESS_FIRM_INFORMATION_ID:number
    ADDRESS=[{}]
    SHOWROOM_OR_DEPO_ADDRESS:Addressinfo
}