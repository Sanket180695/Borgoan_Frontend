export class GpersonalInfo {
    ID: number;
    G_ID:number;
    G_NAME: string;
    G_DOB: any;
    G_AGE: number;
    G_FATHER_NAME: string;
    G_RELATION: string;
    G_MOBILE: string;
    G_OCCUPATION: string;
    G_NET_WORTH: number;
    G_GROSS_MONTHLY_INCOME: number;
    G_LIABILITIES: string;
    GC_STATE: string
    GC_DISTRICT: string
    GC_TALUKA: string
    GC_VILLAGE: string
    GC_PINCODE: string
    GC_LANDMARK: string
    GC_BUILDING: string
    GC_HOUSE_NO: string
    GP_STATE: string
    GP_DISTRICT: string
    GP_TALUKA: string
    GP_VILLAGE: string
    GP_PINCODE: string
    GP_LANDMARK: string
    GP_BUILDING: string
    GP_HOUSE_NO: string
    ARCHIVE_FLAG:string;

    constructor(){
        this.ARCHIVE_FLAG = 'F'
    }
}
