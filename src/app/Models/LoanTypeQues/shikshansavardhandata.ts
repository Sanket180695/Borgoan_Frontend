export class Shikshansavardhandata {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    CHIELD_NAME: string;
    LAST_DEGREE: string;
    LAST_COLLEGE_NAME: string;
    LAST_DEGREE_PERCENTAGE: number = 0;
    COURSE_NAME: string;
    COURSE_DURATION: number;
    COURSE_COLLEGE: string;
    IS_COURSE_COLLEGE_ABROAD: boolean;
    COURSE_COLLEGE_ADDRESS: string = "";
    COURSE_FEES_TOTAL: number;
    COURSE_FEES_FIRST_YEAR: number;
    IS_ADMISSION_TAKEN: boolean;
    IS_COURSE_ELIGIBLE_FOR_SUBSIDY: boolean;
    TENTATIVE_AMOUNT_OF_SUBSIDY: number;
    IS_ELIGIBLE_FOR_ADDITIONAL_BENEFITS: boolean;
    ADDITIONAL_BENEFITS_DETAILS: string;
    IS_TAKEN_ANY_OTHER_LOANS: boolean;
    FEE_DETAILS = []
    EXTRA_BENEFITS_AMOUNT: number;
    DETAILS_OF_SUBSIDY:string
}
