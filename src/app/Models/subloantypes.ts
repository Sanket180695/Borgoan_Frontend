export class Subloantypes {
    ID:number;
    CLIENT_ID:number;
    NAME: string;
    NAME_EN: string;
    NAME_KN: string;
    TYPE:string;
    IS_ACTIVE:boolean=true;
    types= [
        { label: 'Individual', value: 'I', checked: true },
        { label: 'Organization', value: 'O', checked: false },
      ];
}
