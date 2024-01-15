import  { baseKnexConfig } from "../knexFile";
import knex from "knex";
import { DateTime } from "luxon";
import { FlightInfo, UpdateFlightInfo } from "../interface/flightInterface";

const knexInstance = knex(baseKnexConfig);

const desiredTimezone = "Asia/Kathmandu";
const currentTimeInDesiredZone = DateTime.now().setZone(desiredTimezone);
const formattedTime = currentTimeInDesiredZone.toFormat("yyyy-MM-dd HH:mm:ss");
// POST METHOD
export async function addNew(result: FlightInfo) {
  try {
    const databaseInsert = await knexInstance
      .insert({
        userId: result.userId,
        flightname: result.flightname,
        flightdepart: result.flightdepart,
        flightdest: result.flightdest,
        economy: result.economy,
        economyrate: result.economyrate,
        business: result.business,
        businessrate: result.businessrate,
        website: result.website,
        email: result.email,
        phoneno: result.phoneno,
        image1: result.image1,
        createdat: formattedTime,
        updatedat: formattedTime,
      })
      .into("flights")
      .then(function () {
        return (200);
      });
    // console.log(databaseInsert);
    return databaseInsert;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

const array: any = [];
export async function getFlightsById(userId: number) {
  const resultData = await knexInstance
    .select("*")
    .from("flights")
    .where("userId", userId)
    .then(function (data) {
      return data;
    });
  return resultData;
}

export async function deleteFlight(flightId: number, userId: number) {
  try {
    const resultData = await knexInstance("flights")
      .where("id", flightId).andWhere("userId", userId)
      .del()
      .then(function (data) {
        if (data === 0) {
          return (401);
        } else {
          return (200);
        }
      });
    return resultData;
  } catch (error) {
    console.log(error);
  }
}

export async function updateFlight(
  flightId: number,
  newFlightObject: UpdateFlightInfo
) {
  // console.log(`From model ${hotelId}`);
  // console.log(`From model ${JSON.stringify(newHotelObject)}`);
  try {
    const resultData = await knexInstance("flights")
      .where("id", flightId)
      .update({
        userId: newFlightObject.userId,
        flightname: newFlightObject.flightname,
        flightdepart: newFlightObject.flightdepart,
        flightdest: newFlightObject.flightdest,
        economy: newFlightObject.economy,
        economyrate: newFlightObject.economyrate,
        business: newFlightObject.business,
        businessrate: newFlightObject.businessrate,
        website: newFlightObject.website,
        email: newFlightObject.email,
        phoneno: newFlightObject.phoneno,
        image1: newFlightObject.image1,
        createdat: newFlightObject.createdat,
        updatedat: formattedTime,
      })
      .then(function (data) {
        if(data === 1){
          return (200)
        }else{
          return (401)
        }
      });
      return resultData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllFilter(deptValue:string,destValue:string,searchValue:string){
  // From model kathmandu, hunxa
  try {
    let query = knexInstance.select('*').from('flights');
  
    if (deptValue !== 'all') {
      query = query.where('flightdepart', 'ilike', deptValue);
    }
  
    if (destValue !== 'all') {
      query = query.where('flightdest', 'ilike', destValue);
    }
  
    if (searchValue !== 'all') {
      query = query.where('flightname', 'ilike', `%${searchValue}%`);
    }
  
    const resultData = await query;
  
    if (resultData.length === 0) {
      return 404;
    } else {
      return resultData;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  
}


export async function getFlightForUser(flightId: number) {
  const resultData = await knexInstance
    .select("*")
    .from("flights")
    .where("id", flightId)
    .then(function (data) {
      return data;
    });
  return resultData;
}