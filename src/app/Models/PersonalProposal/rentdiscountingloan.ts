export class RentDiscountingLoan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    RENTED_BULDING_TYPE: string="R";
    IS_OWNER: boolean;
    ADDRESS_ID: number;
    NAME_OF_TENANT: string;
    TENENT_TYPE: string;
    RENTED_GIVEN_TIME: number;
    IS_RENT_AGREEMENT_DONE: boolean;
    RENT_AGREEMNT_TIME: number;
    RENT_AGREEMENT_END_DATE: any;
    MONTHLY_RENT: number;
    IS_RENT_TAKEN_CASH_OR_IN_BANK: string="B";
    RENT_BANK_NAME: string;
    IS_DONE_TDS_CUTTING: boolean;
    AMOUNT_AFTER_TDS_CUTTING: number;
    IS_ANY_BANK_LOAN_TAKEN: boolean;
    LOAN_BANK_NAME: string;
    SANCTIONED_LOAN_AMOUNT: number;
    REMAINING_LOAN_AMOUNT: number;

}