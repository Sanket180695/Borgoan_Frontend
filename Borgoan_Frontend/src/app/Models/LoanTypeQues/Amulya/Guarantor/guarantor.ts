

export class Guarantor {
   ID: number;
    PROPOSAL_ID: number;
    IS_OWNERSHIP_FURNISHED: boolean;
    G_NAME : string;
    G_MOBILE : string;
    ARCHIVE_FLAG:string;
    APPLICANT_ID: number

    constructor(){
        this.ARCHIVE_FLAG = 'F' 
        this.IS_OWNERSHIP_FURNISHED = false;
    }
}