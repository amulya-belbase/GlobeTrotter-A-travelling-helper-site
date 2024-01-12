import * as flightModel from "../model/flights";

import { FlightInfo, UpdateFlightInfo } from "../interface/flightInterface";


export const addNew = async (
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
  ) => {
      const result: FlightInfo = {
        userId:userId,
        flightname:flightname, 
        flightdepart:flightdepart,
        flightdest:flightdest,
        economy:economy,
        economyrate: economyrate,
        business: business,
        businessrate: businessrate,
        website:website,
        email:email,
        phoneno:phoneno,
        image1:image1,
        };
        // console.log(`From axios and service ${JSON.stringify(result)}`);

      const data = await flightModel.addNew(result);
      return data; 
  }
  

  export const getFlightsById = async (userId:number) => {
    const data = await flightModel.getFlightsById(userId);
    // console.log(data);
    return (data); 
  }
  

  export const deleteFlight = async (flightId:number,userId:number) => {
    const data = await flightModel.deleteFlight(flightId,userId);
    // console.log(data);
    return (data); 
  }

  export const updateFlight = async (flightId:number,newFlightObject:UpdateFlightInfo) => {
    const data = await flightModel.updateFlight(flightId,newFlightObject);
    // console.log(data);
    return (data); 
  }

  
  export const getAllFilter = async (deptValue:string,destValue:string,searchValue:string) => {
    const data = await flightModel.getAllFilter(deptValue,destValue,searchValue);
    return data;
  } 

  export const getFlightForUser = async (flightId:number) => {
    const data = await flightModel.getFlightForUser(flightId);
    // console.log(data);
    return (data); 
  }