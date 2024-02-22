import { Addressinfo } from './addressinfo'

export class Personalinformation {
    ID:number
    CLIENT_ID:number
    PROPOSAL_ID:number
    APPLICANT_NAME:string
    PARENT_NAME:string
    DOB:any
    GENDER:string="M"
    CAST:string
    PAN:string
    AADHAR:string
    RELIGION:string
    EDUCATION:string
    MEMBERSHIP_NUMBER:string
    PERMANENT_ADDRESS_ID:number
    CURRENT_ADDRESS_ID:number
    MOBILE_NO1:string
    MOBILE_NO2:string
    LANDLINE_NO
    EMAIL_ID:string
    MEMBERS_IN_FAMILY:number
    IS_CO_APPLICANT:boolean
    NET_WORTH_AS_ON:string
    NET_WORTH_AMOUNT:number
    CURRENT_ADDRESS=[{}]
    FAMILY_MEMBERS=[{}]
    PERMANENT_ADDRESS=[{}]
    TYPE:string
    APPLICANT_ID:number;
    AUDULT_COUNT:number
    CHILDREN_COUNT:number
    DATE_OF_MEMBERSHIP:any
    MEMBERSHIP_AMOUNT:number
    OCCUPATION:string
    FAGE:number
    YEAR:number
    AGE :any
    RELATION_WITH_APPICANT=' '
    RECOMENDATION:string
    HOUSE_EXPENDITURE:number
    INSURANCE_EXPENSES:number
    EDUCATION_EXPENSES:number
    MISCELLAN_EXPENSES:number
    OTHER_EXPENSES:number
    LIABILITES:number
    // GROSS_MONTHLY_INCOME:number
    // FATHER_NAME:string
    

    IS_GUARANTOR_OF_BANK :boolean
    IS_COBORROWER_OF_BANK:boolean
   
    SURNAME:string
    MIDDLE_NAME:string
    
    MARRIED_STATUS: string = "M"
   
   
    SHARES_AMOUNT: number;
   
    REFERENCE_NAME = '';
    REFERENCE_MOBILE_NO = '';
    EMPLOYEE_ID = '';
    REMARK_WITH_CUSTOMER = '';


    MOVALE_PROPERTY_VALUE:number;
    IMMOVALE_PROPERTY_VALUE:any;
    G_ANNUAL_INCOME:number;
    G_PERSONAL_LOAN:number;
    
    LIABILITY_AS_SURETY:number;
    GROSS_MONTHLY_INCOME:number
    FATHER_NAME:string
    // ADDRESS_OF_BUSINESS:string 
    // NAME_OF_BUSINESS:string 
    PRAPOSAL_TYPE = 'वैयक्तिक';
    IS_PERSONAL_OR_FIRM:boolean=true
    FIRM_NAME:any
    FIRM_DETAILS:any
}
