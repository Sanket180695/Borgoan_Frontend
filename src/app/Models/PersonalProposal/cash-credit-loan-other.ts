export class CashCreditLoanOther {
    ID:number = 0;
    CLIENT_ID:number;
    PROPOSAL_ID:number
    PURPOSE_OF_CASH_CREDIT:string
    IS_ANY_WORK_ORDER_IN_HAND:boolean
    IS_MAIN_CONTRACTOR_OR_SUB_CONTRACTOR:string= 'M'
    EXPECTED_NET_PROFIT:number
    EXPECTED_AMOUNT_OF_WORK_ORDERS:number
    IS_ANY_SUB_CONTRACTOR:boolean
    WORK_ORDER_DETAILS_ID : number = 0;
}
