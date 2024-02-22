export class Employer {
    ID:number;
    P_ID:number;
    G_ID:number;
    EMP_PHONE:string;
    EMP_NAME: string;
    EMP_ADD: string;
    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}