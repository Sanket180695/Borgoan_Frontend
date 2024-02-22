export class Goldloan1 {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    DESCRIPTION_OF_JEWELS: string;
    TOTAL_QUANTITY: number;
    GROSS_WEIGHT: number;
    NET_WEIGHT: number;
    PER_GRAM_RATE: number = 4000;
    VALUATION_AMOUNT: number;
    REMARK: string;
    ARCHIVE_FLAG:string;
    LOAN_AMOUNT_IN_WORDSSS:string;
    HAND_WRITTEN_AMT_IN_WORDS3:string
    
    
    
    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }

}
