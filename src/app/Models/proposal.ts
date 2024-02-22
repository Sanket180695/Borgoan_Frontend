export class Proposal {
  // DATE_OF_MEMBERSHIP(DATE_OF_MEMBERSHIP: any) {
  //   throw new Error("Method not implemented.");
  // }
  ID: number;
  CLIENT_ID: number;
  APPLICANT_ID: number;
  LOAN_TYPE_ID: number;
  LOAN_TYPE_NAME: string
  LOAN_AMOUNT: number;
  LOAN_AMOUNT_IN_WORDS: string;
  CREATED_ON_DATETIME: Date;
  LAST_UPDATED_ON_DATETIME: Date;
  CURRENT_STAGE_ID: number;
  CURRENT_STAGE_DATETIME: Date;
  BRANCH_ID: number;
  BRANCH_NAME: string;
  BRANCH_NAME_KN = ''
  BRANCH_NAME_EN = ''
  PAN: string
  AGE: number
  APPLICANT_NAME: string
  CURRENT_STAGE_NAME: string
  BOT_REPLY_ID: number
  PROPOSAL_REASON: string
  APPLICANT_ADDRESS: string
  STATE: string
  DISTRICT: string
  TALUKA: string
  VILLAGE: string
  PINCODE: string
  LANDMARK: string
  BUILDING: string
  HOUSE_NO: string
  CIBIL_SCORE: number
  PRAPOSAL_TYPE: string
  MOBILE_NUMBER: string
  PROPOSAL_FILE = ''
  PROPOSAL_REPORT = ''
  SANCTION_FILE = ''
  SANCTION_AMOUNT = 0
  DISBURSED_AMOUNT = 0
  RATE_OF_INTEREST = 0
  SANCTION_DATE: any = null
  RESOLUTION_NO = 0;
  TERM_FOR_LOAN = ''
  loadingRecords2 = false;
  loadingRecords = false;
  BRANCH_OPINION_TEXT = '';
  COMMITTEE_NO: number;
  AMOUNT_IN_WORDS: string;
  TERM_OF_LOAN: number
  TYPE_OF_INSTALLMENT: number;
  EMI_AMOUNT: number


  SIGNATURE: string;

  OCCUPATION: string
  MOROTORIUM: number
  LOAN_RELEASE_DATE: any
  NAME_OF_FIRM: string;
  IN_BEHALF: string;
  SANCTION_AMOUNT_IN_WORDS: string;
  HAND_WRITTEN_AMT_IN_WORDS2: string;
  HAND_WRITTEN_AMT_IN_WORDS3:string
  LOAN_AMOUNT2: number;
  LOAN_AMOUNT_IN_WORDSS: string;
  PARENT_NAME: string;
  INTEREST_RATE1: number;
  SANCTION_AMOUNT3: number;
  TOTALAMT:number;
  TOTALAMTWORDS:string;
  WRITTEN_TOTALAMT_WORDS:string;

  TENURE_OF_LOAN: number;

  IS_PENDING: boolean;
  PENDING_DATE: any;
  BATCH_ID: number;
  IS_RECONSIDERED: boolean
  DAYS: number;

  INSTALLMENT_FREQUENCY_ID: number;
  TERM_ID: number;
  INSTALLMENT_AMOUNT: number;
  INSTALLMENT_COUNT: number;
  INTEREST_RATE: number = 15;
  LOAN_AMOUNT1 : number;

  DOB: any;
}
