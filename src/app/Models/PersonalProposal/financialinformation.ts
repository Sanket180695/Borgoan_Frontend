export class Financialinformation {
    ID: number
    CLIENT_ID: number
    PROPOSAL_ID: number
    IS_INCOME_TAX_FILED: boolean
    FINANCIAL_YEAR: number
    INCOME_AMOUNT: number
    TAX_PAID_AMOUNT: number
    AGRICULTURE_INCOME: number
    OTHER_INCOME: number
    MONTHLY_HOUSEHOLD_EXPENSES: number
    IS_PIGMY: boolean = true
    BANK_NAME: string
    DAILY_PIGMY_AMOUNT: number
    PIGMY_BALANCE: number
    LAST_3_YEAR_INFORMATION = []
    CURRENT_DEPOSIT=[]
    RECURING_DEPOSIT:any= []
    TERM_DEPOSIT=[]
    TYPE: string
    APPLICANT_ID: number
    CC_LOAN_TERNOVER: number
    INCOME_SOURCE_AMOUNT: string
    YEARLY_INCOME: number
    SAVING_ACCOUNT_NO: any
    SAVING_AMOUNT: number
    OTHER_DEPOSIT_ACC_NO: string
    OTHER_DEPOSIT_ACC_NO2: string
    BALANCE_AMOUNT: number
    BALANCE_AMOUNT2: number
    ACCOUNT_NO: string
    ACCOUNT_BALANCE: number
    LOAN_TAKEN_YEARS: number
    SHARE_ACCOUNT_NO:number
    PERIODS:number
    TYPE_OF_ACCOUNT:string  
    FINANCIAL_INFORMATION_ID:number
    IS_HAVE_DEPOSIT:any
    DEPOSIT_TYPE:any

    IS_HAVE_TERM_DEPOSIT:boolean
    IS_HAVE_CURRENT_DEPOSIT:boolean
    IS_HAVE_RECURRING_DEPOSIT:boolean
    IS_PAY_SALES_TAX_FILED: boolean
    FINANCIAL_YEAR_SALES_TAX:number
    SALES_TAX_PAID_AMOUNT:number
    IS_HAVE_FIXED_DEPOSIT:boolean



}
