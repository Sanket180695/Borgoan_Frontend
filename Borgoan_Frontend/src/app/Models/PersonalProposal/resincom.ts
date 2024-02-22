export class Resincom {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    ADDRESS_ID: number;
    OWNER_NAME: string;
    AREA_OF_PROPERTY: number;
    PROPERY_VALUE: number;
    IS_ANY_EXISTING_LOAN: boolean = false;
    TOTAL_AMOUNT_OF_DEBTS: number;
    IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK: boolean = false;
    PAYABLE_AMOUNT:number
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string
    VALUATION_DATE: any
    VALUATION_AMOUNT: number
}
