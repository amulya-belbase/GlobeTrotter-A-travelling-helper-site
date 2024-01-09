import * as hotelModel from "../model/hotels";

import { HotelInfo } from "../interface/hotelInterface";


export const addNew = async (
    hotelname:string, 
    location:string,
    established:string,
    signlerooms:number,
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
        hotelname:hotelname, 
        location:location,
        established:established,
        signlerooms:signlerooms,
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
        console.log(`From service ${JSON.stringify(result)}`);

      // const data = await hotelModel.addNew(result);
      // return data; 
  }
  