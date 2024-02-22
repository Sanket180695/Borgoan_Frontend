export class Propertyinformation {
    ID: number
    CLIENT_ID: number
    PROPOSAL_ID: number
    INCOME_INFO_REF_ID: number
    INCOME_INFORMATION_ID:number
    OWNER_NAME:string
    MOVABLE_TYPE: string
    IS_MACHINERY_OR_OTHER: string="M"
    IS_AGRICULTURE_LAND_OR_OTHER: string;
    TOTAL_AREA: number
    AREA_UNIT: string;
    ADDRESS_ID: number
    BUILDUP_AREA: number
    PROPERTY_DETAILS: string
    IS_VALUATION_DONE: boolean
    VALUATOR_NAME: string
    VALUATION_AMOUNT: number

    CATEGORY_OF_SOIL:string

    VALUATION_DATE: string
    POLICY_NO:number
    INSURANCE_NO:string
    VALUATION:number
    CHESIS_NO:number
    ENGINE_NO:number
    MODEL_NO:number
    VEHICLE_NO:string
    INSURANCE_EXPIRY_DATE:string
    VEHICLE_NAME:string
    WHEELS_COUNT:any
    VEHICLE_TYPE:string="N"

    IS_MORTGAGED:boolean
    IS_MORTGAGED_SUB:boolean=false
    IS_MORTGAGED_FOR_SUB:boolean
    BANK_INSTITUTION_NAME:string
    LOAN_OUTSTANDING_AMOUNT:number
    EXPECTED_AMOUNT
    STOCK_AMOUNT:number
    TYPE:string
    APPLICANT_ID:number
    REMARK:string
    AKAR_RS:number
    MORTGUAGE_DETAILS:string
    OUT_OF_WHICH:string
    EAST:any
    WEST:any
    NORTH:any
    SOUTH:any

    IS_VERIFIED:boolean=false
    DATE_OF_VERIFICATION:any
    NAME_OF_VERIFYING_OFFICER:string
    DETAILS_OF_DOCUMENT_CONFORMING_RIGHT:boolean
    ENCUMBRANCE:any

    BOJA_TYPE:string="R"
    
    ACRE:number
    GUNTE:number
    AANE:number
    OUT_OF_ACRE:number
    OUT_OF_GUNTE:number
    OUT_OF_AANE:number


    R_S_NO:number
    TMC_NO:number
    SURVEY_NO:number
    VPC_NO:number
    FLAT_NO:number
    PLOT_NO:number
    E_SWATTU:number
    CTS_NO:number
    PROPERTY_OWNED:string = 'P';

    ARCHIVE_FLAG:string;
    constructor(){
        this.ARCHIVE_FLAG = 'F';
    }
}
