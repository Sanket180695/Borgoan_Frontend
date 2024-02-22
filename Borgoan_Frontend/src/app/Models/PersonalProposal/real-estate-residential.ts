export class RealEstateResidential {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    PURPOSE_OF_LOAN: string = '1';
    TYPE_OF_PROPERTY: string = "F";
    ADDRESS_ID: number;
    ADVANCE_PAYMENT: number;
    CARPET_AREA: number;
    SELLABLE_AREA: number;
    BOOKED_FLAT_NUMBER: number;
    IS_SOCIETY_FORMED: boolean = false;
    TENTETIVE_POSSESSION_DATE: any
    AGREEMENT_VALUE: number;
    PROPERY_VALUE: number;
    PER_SQ_FEET_RATE: number;
    IS_DONE_AGREEMENT: boolean = false;
    OWNER_NAME: string;
    IS_PAID_GOVERNMENT_DUES: boolean = false;
    IS_ANY_EXISTING_LOAN: boolean = false;
    PLOT_AREA: number;
    IS_PLOT_NA_OR_NA_ORDERED: string = 'N';
    IS_CONSTRUCTION_PLAN_READY: boolean = false;
    IS_PERMISSION_OBTAINED: boolean = false;
    TOTAL_CONSTRUCTION_AREA: number;
    TOTAL_CONSTRUCTION_COST: number;
    EXPECTED_COMPLETION_TIME: number;
    NATURE_OF_PROPERTY: string;
    IS_TAKEN_ESTIMATION: boolean = false;
    ESTIMATION_DETAILS: string;
    COST_OF_REPAIRY: number;
    NAME_OF_BUILDER_DEVELOPER: string;
    TOTAL_AMOUNT_OF_DEBTS: number
    IS_DEBT_AMOUNT_PAYABLE_TO_OTHER_BANK: boolean = false;
    EXISTING_LOAN_AMOUNT: number
    PLEDGED_TYPE: string
    IS_VALUATION_DONE: boolean = false;
    IS_PAID_ADVANCE_AMOUNT: boolean = false;
    VALUATOR_NAME: string
    VALUATION_DATE: any
    VALUATION_AMOUNT: number
    EAST: string
    WEST: string
    SOUTH: string
    NORTH: string
    AKAR_RS: number
    CONSTRUCTION_MATERIAL_DETAILS: string 
}
