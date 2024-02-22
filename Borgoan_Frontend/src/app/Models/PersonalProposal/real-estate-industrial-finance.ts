export class RealEstateIndustrialFinance {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    ADDRESS_ID: number;
    IS_PLOT_NA_OR_NA_ORDERED: string = 'O';
    NAME_OF_BUILDER_DEVELOPER: string;
    TOTAL_AREA_OF_CONSTRUCTION: number
    TOTAL_COST_OF_CONSTRUCTION: number
    INDUSTRIAL_FINANCE_TYPE: string = '1';
    IS_LEASE_DEAD_MADE: boolean = false;
    NAME_OF_LESSOR: string;
    IS_AVALABLE_PLOT_ALLOTEMENT_LETTER: boolean = false;
    IS_AVAILABLE_POSSESSION_LETTER: boolean = false;
    PLOT_AREA: number;
    IS_PAID_STATUTORY_DUTY: boolean = false;
    APPROXIMATE_VALUATION_OF_PLOT: number;
    IS_PLAN_READY_FOR_CONSTRUCTION: boolean = false;
    IS_PERMISSION_TAKEN: boolean = false;
    IS_NOC_OBTAINED: boolean = false;
    EXPECTED_COMPLETION_TIME: number;
    IS_MIDC_READY_FOR_TRIPARTY_AGREEMENT: boolean = false;
    IS_PLOT_RENTED_OR_OWN: string = 'O';
    IS_PAID_GOVERNMENT_DUTIES: boolean = false;
    NAME_OF_OWNER: string;
    IS_PLOT_TAKEN_ON_LEASE: boolean = false;
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string
    VALUATION_DATE: any
    VALUATION_AMOUNT: number
}
