
export class GpropertyInfo {
    ID: number
    G_ID: number;
    PROPERTY_TYPE: string;
    PROPERTY_DETAILS: string

    TOTAL_AREA: number;
    OUT_OF_WHICH: string;
    AKAR_RS: number;
    ESTIMATED_PRICE: number;
    APPROXIMATE_VALUES: number;
    REMARK: string;
    REMARKS: string;
    CATEGORY_OF_SOIL: string;

    R_S_NO: any
    HISSA: any;
    TMC_NO: any
    SURVEY_NO: any
    VPC_NO: any
    FLAT_NO: any
    PLOT_NO: any
    E_SWATTU: any
    CTS_NO: any

    AREA: string;

    EAST: any;
    WEST: any;
    NORTH: any;
    SOUTH: any;

    DOC_CONFIRM: boolean;
   
    OLD_OR_NEW: string;
    VEHICLE_NAME: string
    VEHICLE_TYPE: string;
    VEHICLE_NO: string
    MODEL_NO: string;
    ENGINE_NO: string;
    CHESIS_NO: string;
    VALUATION: number

    INSURANCE_COPM: string
    POLICY_NO: number
    VALUATION_DATE: string
    INSURANCE_EXPIRY_DATE: string;


    GP_STATE: string
    GP_DISTRICT: string
    GP_TALUKA: string
    GP_VILLAGE: string
    GP_PINCODE: string
    GP_LANDMARK: string
    GP_BUILDING: string
    GP_HOUSE_NO: string
    
    ARCHIVE_FLAG: string;

    constructor(){
        this.ARCHIVE_FLAG = 'F';
        this.PROPERTY_TYPE = 'A';
        this.DOC_CONFIRM = false;
        this.OLD_OR_NEW = 'N';
    }

}