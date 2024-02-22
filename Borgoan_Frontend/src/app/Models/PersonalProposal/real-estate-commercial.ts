export class RealEstateCommercial {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    TYPE_OF_PROPERTY: string;
    IS_FIRST_SALE_OR_RESALE: string ='F';
    BOOKED_SHOP_OR_OFFICE_NUMBER: number;
    PURPOSE_OF_LOAN: string;
    ADDRESS_ID: number;
    ADVANCE_PAYMENT: number;
    IS_PAID_ADVANCE_AMOUNT: boolean=false;
    CARPET_AREA: number;
    SELLABLE_AREA: number;
    IS_SOCIETY_FORMED: boolean=false;
    TENTETIVE_POSSESSION_DATE:any
    AGREEMENT_VALUE: number;
    PROPERY_VALUE: number;
    PER_SQ_FEET_RATE: number;
    IS_DONE_AGREEMENT: boolean=false;
    OWNER_NAME: string =' ';
    IS_PAID_GOVERNMENT_DUES: boolean=false;
    IS_ANY_EXISTING_LOAN: boolean=false;
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string
    VALUATION_DATE: any
    VALUATION_AMOUNT: number
}
