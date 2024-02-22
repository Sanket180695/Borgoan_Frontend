export class TourAndTravelLoan {
    ID: number;
    CLIENT_ID: number;
    PROPOSAL_ID: number;
    TOTAL_FAMILY_MEMBERS_TO_TRAVELS: number
    TRAVELLING_PLACE_NAME: string
    TRAVELING_PLACE: string = "D"
    TRAVELLING_TIME: number
    TRAVELLING_START_DATE: any
    TRAVELLING_RETURN_DATE: any
    IS_TRAVELLING_SELF_OR_TRAVELLING_AGENCY: string = "S"
    TRAVEL_AGENCY_NAME: string
    TRAVEL_AGENCY_QUOTATION_AMOUNT: number
    IS_GIVE_ADVANCE_AMOUNT_TO_TRAVEL_AGENCY: any =false
    ADVANCE_AMOUNT: number
    IS_LTC_PROVIDED: any =false
    
}
