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