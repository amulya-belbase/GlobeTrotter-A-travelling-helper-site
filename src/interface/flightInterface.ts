export interface FlightInfo {
    userId:number,
    flightname:string, 
    flightdepart:string,
    flightdest:string,
    economy:number,
    economyrate: number,
    business: number,
    businessrate: number,
    website:string,
    email:string,
    phoneno:number,
    image1:string,
}

export interface UpdateFlightInfo {
    userId:number,
    flightname:string, 
    flightdepart:string,
    flightdest:string,
    economy:number,
    economyrate: number,
    business: number,
    businessrate: number,
    website:string,
    email:string,
    phoneno:number,
    image1:string,
    createdat:Date,
}