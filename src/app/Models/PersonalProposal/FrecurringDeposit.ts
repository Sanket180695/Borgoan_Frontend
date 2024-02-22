export class FRecurringDeposit {
    ID: number
    CLIENT_ID: number
    PROPOSAL_ID: number
    FINANCIAL_INFORMATION_ID:number
    IS_HAVE_RECURRING_DEPOSIT:boolean
    IS_HAVE_DEPOSIT = 1
    DEPOSIT_TYPE:string
    ACC_NO:any
    ACC_AMOUNT:number
    LOAN_AMOUNT: number;
    LOAN_AMOUNT_IN_WORDS: string;
    LOAN_AMOUNT_IN_WORDSS:string;
    MATURITY_DUE:any
    ARCHIVE_FLAG:string;
    IS_HAVE_FIXED_DEPOSIT = 1;
   
    PIGMY_AMOUNT1:number;
    RECEIPT_NO:number;
    INTEREST_RATE:number;
    total6:number




    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}