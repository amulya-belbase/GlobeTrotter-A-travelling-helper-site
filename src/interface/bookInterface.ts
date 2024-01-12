export interface BookHotelInfo {
    userId:number,
    hotelId:number, 
    hotelname:string,
    arrivalDate:Date,
    room_type:string,
    room_rate: number,
    room_count: number,
}

export interface UpdateHotelBooking {
    userId:number,
    hotelId:number, 
    hotelname:string,
    arrivalDate:Date,
    room_type:string,
    room_rate: number,
    room_count: number,
    createdat:Date,
}


export interface BookFlightInfo {
    userId:number,
    flightId:number, 
    flightname:string,
    departureDate:Date,
    seat_type:string,
    seat_rate: number,
    seat_count: number,
}      
export interface UpdateFlightBooking {
    userId:number,
    flightId:number, 
    flightname:string,
    departureDate:Date,
    seat_type:string,
    seat_rate: number,
    seat_count: number,
    createdat:Date,
}