export class TRAVELSLOANFAMILYDETAILS {
    ID: number;
    CLIENT_ID: number;
    TOUR_AND_TRAVELS_LOAN_ID: number;
    NAME:string
    PASSPORT_NUMBER: string;
    PASSPORT_VALIDITY_DATE :any
    VISA_COUNTRY_NAME:string
    VISA_TYPE:string
    VISA_VALIDITY: any;
    IS_TAKEN_INSURANCE: any =false
}
export class TravelPlan {
    ID: number;
    CLIENT_ID: number;
    TOUR_AND_TRAVELS_LOAN_ID: number;
    MEANS_OF_TRAVELS: string
    FROM_LOCATION: string
    TO_LOCATION: string
    TRAVEL_DATE:any
    TRAVELS_INSURENCE_DETAILS: string
    IS_TICKET_TAKEN: any =false
    TICKET_AMOUNT: number
}
