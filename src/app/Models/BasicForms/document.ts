export class Document {
    ID:number;
    CLIENT_ID:number;
    GROUP_ID:number;
    NAME: string;
    NAME_EN: string;
    NAME_KN: string;
    STATUS:boolean=true;
    MAX_SIZE_ALLOWED:number;
    ALLOWED_TYPES:string;
    allowedTypes:string[]
}
