export class MachineryLoan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    PURPOSE_OF_LOAN: string;
    NATURE_OF_MACHINERY: string;
    AVAILABILITY_TYPE: string = "R";
    DETAILS_OF_MACHINERY: string;
    IS_RELATED_TO_BUSINESS: boolean = false;
    LIFE_OF_MACHINERY: number;
    DEALER_NAME: string;
    IS_ADVANCE_PAID: boolean = false;
    ADVANCE_PAID_AMOUNT: number;
    EXPECTED_TO_INCREASED_PRODUCTIVITY: any
    EXPECTED_PER_ANNUM_INCOME: number;
    MACHINERY_TYPE: string = "N";
    QUOTATION_AMOUNT: number;
    QUOTATION_GIVEN_DATE: any;
    IS_DONE_AGREEMENT: boolean = false;
    YEAR_OF_PURCHASE: string;
    PURCHASE_AMOUNT: number;
    IS_INDUSTRIAL_LOAN = 0
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string;
    VALUATION_DATE: any;
    VALUATION_AMOUNT: number;
    PRODUCTION_YEAR:string
}