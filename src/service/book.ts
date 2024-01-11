import * as bookModel from "../model/book";

import { BookHotelInfo, UpdateHotelBooking } from "../interface/bookInterface";


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