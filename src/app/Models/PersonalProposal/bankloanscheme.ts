export class Bankloanscheme {
    ID:number;
    CLIENT_ID:number;
    PROCESSING_FEE:number;
    NAME_MR:string;
    NAME_KN:string;
    NAME_EN:string;
    TYPE:string;
    IS_ACTIVE:boolean=true;
    types= [
        { label: 'Individual', value: 'I', checked: true },
        { label: 'Organization', value: 'O', checked: false },
      ];
      IS_INDIVIDUAL:boolean=false
      IS_FIRM:boolean=false
      IS_CASH_CREDIT:boolean=false
      IS_SALARIED:boolean=false
      IS_FARMER:boolean=false
      IS_PROPRIETER:boolean=false
      IS_BUSINESS:boolean=false
      IS_MANUFACTURING:boolean=false
}
