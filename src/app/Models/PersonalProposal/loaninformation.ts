export class Loaninformation {
    CLIENT_ID: number = 1;
    ID: number;
    PROPOSAL_ID: number;
    LOAN_PURPOSE: number;
    LOAN_AMOUNT: number;
    LOAN_AMOUNT_IN_WORDS: string;
    LOAN_TYPE_ID: number;
    BANK_LOAN_TYPE_ID: number;
    TENURE_OF_LOAN: number;
    LOAN_TYPE_NAME_EN=''
    LOAN_TYPE_NAME_KN=''
    INSTALLMENT_FREQUENCY_ID: number;
    INDUSTRY_CODE_ID: number
    PRIORITY_CODE_ID: number
    WEEKER_SECTION_ID: number
    INSTALLMENT_AMOUNT: number;
    INSTALLMENT_COUNT:number;
    REAL_ESTATE_MARKING: string
    IS_LOAN_SCHEME_UPDATE
    SHARE_AMOUNT: number = 0;
    INSURANCE_AMOUNT: number = 0;
    SECURITY_DEPOSIT: number = 0;
    PENALTY_INTEREST: number = 2;
    SANCTION_DATE:any
    NOMINEE_NAME = ''
    NOMINEE_ADDRESS = ''
    NOMINEE_AGE = ''
    NOMINEE_RELATION = ''
     INSTALLMENT_FREQUENCY_NAME_KN
     INSTALLMENT_FREQUENCY_NAME_EN
     INSTALLMENT_FREQUENCY_NAME
     SANCTION_AMOUNT:number

     TERM_ID:number
     LOAN_PURPOSE_ID:number
     INTEREST_RATE:number
    PURPOSE_OF_LOAN:number
    TYPE_OF_INSTALLMENT:number
    MOROTORIUM:number
    HAND_WRITTEN_AMT_IN_WORDS =''
}
