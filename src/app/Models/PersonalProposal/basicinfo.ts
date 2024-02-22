export class Basicinfo {
    ID: number
    CLIENT_ID: number;
    USER_ID:number
    IS_CUSTOMER_OF_BANK = true
    BRANCH_ID: number = 0
    ASSING_BRANCH_ID: number
    PRAPOSAL_TYPE = 'वैयक्तिक';
    APPLICANT_NAME: string
    PARENT_NAME: string
    OCCUPATION :string
    DOB: string
    GENDER: string = "M"
    CAST: string
    PAN: string
    AADHAR: string
    RELIGION: string
    EDUCATION: string
    CURRENT_ADDRESS_ID: number=0
    MOBILE_NO1: string
    EMAIL_ID: string
    MEMBERS_IN_FAMILY: number
    LOAN_PURPOSE: string;
    LOAN_PURPOSE_ID:number;
    LOAN_AMOUNT: number;
    LOAN_AMOUNT_IN_WORDS: string;
    LOAN_TYPE_ID: number;
    IS_EXISTING_LOAN_WITH_OTHER_BANKS = false;
    IS_LOAN_FOR_FILL_PREVIOUS_LOAN = false;
    OUTSTANDING_BANK_AMOUNT: string ;
    ALL_LOAN_MONTHLY_INSTALLMENT: number
    F_NAME_OF_FIRM: string;
    F_NATURE_OF_BUSINESS: string;
    F_CONSTITUTION_OF_FIRM: string;
    F_IS_MSME_REGISTERED: boolean=false;
    F_MSME_REGISTRATION_NUMBER: string;
    F_MSME_REGISTRATION_DATE: any;

    F_PAN_NUMBER_OF_FIRM: string;

    F_IS_GST_REGISTARTION_CERTIFICATE: boolean=false;


    F_LANDLINE_NUMBER: string;

    F_GST_NUMBER: string;

    FIRM_INVESTMENT:number
    FIRM_YEARLY_BUSINESS:number
    FIRM_YEARLY_PROFIT:number;
    OWNER_NAME: string
    IS_AGRICULTURE_LAND_OR_OTHER:any=['A']
    VALUATION_AMOUNT: number
    IS_INCOME_TAX_FILED: boolean
    FINANCIAL_YEAR: number
    INCOME_AMOUNT: number
    TAX_PAID_AMOUNT: number
    INCOME_SOURCE = '1'
    PLACE_OF_EMPLOYMENT: number=0
    ORGANISATION_NAME: string;
    POST_OF_EMPLOYMENT: string;
    TYPE_OF_EMPLOYMENT: string = "P";
    GROSS_SALARY: number;
    NET_SALARY: number;
    SALARY_PAID_TYPE: string = "B";
    BANK_NAME: string;
    BRANCH_NAME: string;
    IFSC_CODE: string;
    
    TOTAL_AREA_IN_APPLICANT_NAME: number;
    DETAILED_ADDRESS_ID: number=0
    TYPE_OF_AGRICULTURE_LAND: string;
    CURRENT_AGRICULTURE_PRODUCT: string;
    ANNUAL_INCOME_FROM_THIS_LAND: number;
    NAME_OF_FIRM: string;
    NATURE_OF_FIRM: string;
    ADDRESS_ID: number=0
    NUMBER_OF_YEARS: number;
    B_FIRM_INVESTMENT:number
    B_FIRM_YEARLY_BUSINESS:number
    B_FIRM_YEARLY_PROFIT:number;
    TYPE = 'B'
    FIRM_ADDRESS_ID:number=0

    TYPE_OF_SECTOR='P'
    bagayat: any=false
    jirayat: any=false
    VILLAGE_NAME=''
    IS_ANOTHER_AGRI_SUPPLEMENT_TO_BUSINESS =false
    IS_AGRICULTURE_LAND_OR_OTHER_PROPERTY = false

    CUSTOMER_ID:any;
    HAND_WRITTEN_AMT_IN_WORDS: string;
    BRANCH_NAME_EN: string;
    BRANCH_NAME_KN: string;

}

