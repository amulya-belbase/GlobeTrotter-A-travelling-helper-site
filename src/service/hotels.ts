import * as hotelModel from "../model/hotels";

import { HotelInfo, UpdateHotelInfo } from "../interface/hotelInterface";


export const getAllFilter = async (locationValue:string,searchValue:string) => {
  const data = await hotelModel.getAllFilter(locationValue,searchValue);
  return data;
} 

export const addNew = async (
    userId:number,
    hotelname:string, 
    location:string,
    established:string,
    singlerooms:number,
    singleroomrate: number,
    doublerooms: number,
    doubleroomsrate: number,
    suites: number,
    suitesrate: number,
    website:string,
    email:string,
    phoneno:string,
    image1:string,
  ) => {
      const result: HotelInfo = {
        userId:userId,
        hotelname:hotelname, 
        location:location,
        established:established,
        singlerooms:singlerooms,
        singleroomrate: singleroomrate,
        doublerooms: doublerooms,
        doubleroomsrate: doubleroomsrate,
        suites: suites,
        suitesrate: suitesrate,
        website:website,
        email:email,
        phoneno:phoneno,
        image1:image1,
        };
        // console.log(`From axios and service ${JSON.stringify(result)}`);

      const data = await hotelModel.addNew(result);
      return data; 
  }
  

  export const getHotelsById = async (userId:number) => {
    const data = await hotelModel.getHotelsById(userId);
    // console.log(data);
    return (data); 
  }
  

  export const deleteHotel = async (hotelId:number,userId:number) => {
    const data = await hotelModel.deleteHotel(hotelId,userId);
    // console.log(data);
    return (data); 
  }

  export const updateHotel = async (hotelId:number,newHotelObject:UpdateHotelInfo) => {
    const data = await hotelModel.updateHotel(hotelId,newHotelObject);
    // console.log(data);
    return (data); 
  }

  
  export const getHotelForUser = async (hotelId:number) => {
    const data = await hotelModel.getHotelForUser(hotelId);
    // console.log(data);
    return (data); 
  }