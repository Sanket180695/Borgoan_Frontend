export class DhanwantariLoan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    PURPOSE_OF_LOAN: string;
    PROFESSIONAL_EXPERTISE_SKILL: string;
    AVAILABILITY: string="R";
    TYPE: string="N";
    NAME_OF_DEALER_FIRM: string;
    DATE_OF_QUOTATION: any;
    AMOUNT_OF_QUOTATION: number
    VALIDITY: number
    PURCHASE_AMOUNT: number
    IS_PAID_ADVANCE_AMOUNT: boolean=false;
    ADVANCE_PAYMENT_TO_DEALER: number
    IS_AGREEMENT_WITH_DEALER: boolean=false;
    NATURE_OF_MACHINERY: string;
    DETAILS_OF_MACHINERY: string;
    IS_RELATED_TO_BUSINESS: boolean=false;
    YEAR_OF_ORIGINAL_PURCHASE:string
    EXPECTED_INCOME_PER_ANNUM: number
    ADDRESS_ID: number;
    AREA_OF_PLOT: number
    IS_PLOT_NA_OR_NA_ORDERED: string='N';
    IS_ALL_GOVERNMENT_DUES_PAID: boolean=false;
    IS_CONSTRUCTION_PLAN_READY: boolean=false;
    IS_PERMISSION_OF_CONSTRUCTION: boolean=false;
    NAME_OF_BUILDER_DEVELOPER: string;
    TOTAL_AREA_OF_CONSTRUCTION: number
    TOTAL_COST_OF_CONSTRUCTION: number
    EXPECTED_TIME_OF_CONSTRUCTION: number
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string;
    VALUATION_DATE: any;
    VALUATION_AMOUNT: number;
    COMPANY_OF_MACHINERY: string
}
