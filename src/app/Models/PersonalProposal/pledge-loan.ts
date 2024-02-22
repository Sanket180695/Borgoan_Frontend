export class PledgeLoan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    STOCK_PLACE: string
    NAME_OF_STOCK_STORAGE: string
    STORAGE_OWNER_NAME: string
    ADDRESS_DETAILS_ID: number
    IS_LOAN_TAKEN_FOR_STOCK_PLACE: boolean=false
    BANK_NAME: string
    IS_ANY_RENT_AGREEMENT_FOR_STOCK_PLACE: boolean=false
    DETAILS_OF_INSURENCE_OF_STOCK_PLACE: string
    DETAILS_OF_EXISTING_PLEDGE_LOAN: string
    IS_STOCK_PLACE_OWNED_OR_RENTED: string = 'O'
    RECEIPT_NUMBER: number;
    STOCK_YEAR: any
    VALUATION_OF_STOCK: number;
    VALUATORS_NAME: string;
    VALUATION_DATE: any
    IS_AVAILABLE_COLATERAL_MANAGER: boolean =false
    IS_VALUATION_DONE: boolean=false
    PRODUCTION_SEASON_YEAR: any
    STOCK_WEIGHT: number;
    WEIGHT_UNIT: string;
    STOCK_DETAILS: string;
}
