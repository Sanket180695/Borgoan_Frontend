export class Vehicleloan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    NAME_OF_VEHICLE: string;
    WHEELS_COUNT: string = '1';
    VEHICLE_COMPANY: string;
    USE_TYPE: string = 'I';
    IS_BS6: boolean = false;
    INSURANCE_TYPE: string = 'C';
    COMPREHENSIVE_INSURANCE_PERIOD: number;
    THIRD_PARTY_INSURANCE_PERIOD: number;
    VEHICLE_TYPE: string = 'N';
    DEALER_NAME: string;
    QUOTATION_GIVEN_DATE: any;
    PREVIOUS_OWNER_NAME: string;
    NUMBER_OF_OWNERSHIPS: number;
    VEHICLE_VALUATION: number;
    YEAR_OF_PURCHASE: string;
    PURCHASE_AMOUNT: number;
    IS_ADVANCE_PAID: boolean;
    ADVANCE_PAID_AMOUNT: number;
    MAKE_YEAR: any
    BASIC_PRICE: number;
    ACCESSORIES_PRICE: number;
    RTO_TAX_OR_REGISTRATION_PRICE: number;
    INSURENCE: number;
    OTHER_CHARGES: number;
    OTHER_PRICE1: number;
    OTHER_PRICE2: number;
    IS_VALUATION_DONE: boolean = false;
    VALUATOR_NAME: string
    VALUATION_DATE: any
    VALUATION_AMOUNT: number
    IS_DONE_AGREEMENT: boolean = false;
    REGISTRATION: string
    FITNESS_PERIOD: string
    TAX_PERIOD: string
}
