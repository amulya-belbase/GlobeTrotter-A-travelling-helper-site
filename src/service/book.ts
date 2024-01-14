import * as bookModel from "../model/book";

import { BookHotelInfo, UpdateHotelBooking, BookFlightInfo, UpdateFlightBooking } from "../interface/bookInterface";


// FOR HOTELS
export const bookNewHotel = async (
    userId:number,
    hotelId:number, 
    hotelname:string,
    arrivalDate:Date,
    room_type:string,
    room_rate: number,
    room_count: number,
  ) => {
      const result: BookHotelInfo = {
        userId:userId,
        hotelId:hotelId, 
        hotelname:hotelname,
        arrivalDate:arrivalDate,
        room_type:room_type,
        room_rate: room_rate,
        room_count: room_count,
        };
        // console.log(`From axios and service ${JSON.stringify(result)}`);

      const data = await bookModel.bookNewHotel(result);
      return data; 
  }
  

  export const myHotels = async (userId:number) => {
    const data = await bookModel.myHotels(userId);
    // console.log(data);
    return (data); 
  }


  export const updateMyHotel = async (id:number,newHotelObject:UpdateHotelBooking) => {
    const data = await bookModel.updateMyHotel(id,newHotelObject);
    // console.log(data);
    return (data); 
  }
  

  export const deleteMyHotel = async (entryId:number,userId:number) => {
    const data = await bookModel.deleteMyHotel(entryId,userId);
    // console.log(data);
    return (data); 
  }

// FOR FLIGHTS
  export const bookNewFlight = async (
    userId:number,
    flightId:number, 
    flightname:string,
    departureDate:Date,
    seat_type:string,
    seat_rate: number,
    seat_count: number,
  ) => {
      const result: BookFlightInfo = {
        userId:userId,
        flightId:flightId, 
        flightname:flightname,
        departureDate:departureDate,
        seat_type:seat_type,
        seat_rate: seat_rate,
        seat_count: seat_count,
        };
        // console.log(`From axios and service ${JSON.stringify(result)}`);

      const data = await bookModel.bookNewFlight(result);
      return data; 
  }

  export const myFlights = async (userId:number) => {
    const data = await bookModel.myFlights(userId);
    // console.log(data);
    return (data); 
  }

  
  export const updateMyFlight = async (id:number,newHotelObject:UpdateFlightBooking) => {
    const data = await bookModel.updateMyFlight(id,newHotelObject);
    // console.log(data);
    return (data); 
  }

    
  export const deleteMyFlight = async (entryId:number,userId:number) => {
    const data = await bookModel.deleteMyFlight(entryId,userId);
    // console.log(data);
    return (data); 
  }

  export const downloadHotel = async (dataId:number) => {
    const data = await bookModel.downloadHotel(dataId);
    // console.log(data);
    return (data); 
  }

  export const downloadFlight = async (dataId:number) => {
    const data = await bookModel.downloadFlight(dataId);
    // console.log(data);
    return (data); 
  }