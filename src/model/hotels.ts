import  { baseKnexConfig } from "../knexFile";
import knex from "knex";
import { DateTime } from "luxon";
import { HotelInfo, UpdateHotelInfo } from "../interface/hotelInterface";

const knexInstance = knex(baseKnexConfig);

const desiredTimezone = "Asia/Kathmandu";
const currentTimeInDesiredZone = DateTime.now().setZone(desiredTimezone);
const formattedTime = currentTimeInDesiredZone.toFormat(
  "yyyy-MM-dd HH:mm:ss"
);

export async function getAllFilter(locationValue:string,searchValue:string){
  // From model kathmandu, hunxa
  try {
    let query = knexInstance.select('*').from('hotels');
  
    if (locationValue !== 'all') {
      query = query.where('location', 'ilike', locationValue);
    }
  
    if (searchValue !== 'all') {
      query = query.where('hotelname', 'ilike', `%${searchValue}%`);
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

// POST METHOD
export async function addNew(result: HotelInfo) {
  try {
    const databaseInsert = await knexInstance
      .insert({
        userId: result.userId,
        hotelname: (result.hotelname),
        location: (result.location),
        established: result.established,
        singlerooms: result.singlerooms,
        singleroomrate: result.singleroomrate,
        doublerooms: result.doublerooms,
        doubleroomrate: result.doubleroomsrate,
        suites: result.suites,
        suiterate: result.suitesrate,
        website: result.website,
        email: result.email,
        phoneno: result.phoneno,
        image1: result.image1,
        createdat: formattedTime,
        updatedat: formattedTime,
      })
      .into("hotels")
      .then(function () {
        return 200;
      });
    console.log(databaseInsert);
    return databaseInsert;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
}

const array: any = [];
export async function getHotelsById(userId: number) {
  const resultData = await knexInstance
    .select("*")
    .from("hotels")
    .where("userId", userId)
    .then(function (data) {
      return data;
    });
  return resultData;
}

export async function deleteHotel(hotelId: number,userId:number) {
  // console.log(`From model: userId ${userId} & hotelId: ${hotelId}`);
  try {
    const resultData = await knexInstance("hotels")
      .where("id", hotelId).andWhere('userId', userId)
      .del()
      .then(function (data) {
        if(data === 0){
          return (401)
        }else{
          return (200)
        }
      });
    return resultData;
  } catch (error) {
    console.log(error);
  }
}

export async function updateHotel(hotelId: number, newHotelObject: UpdateHotelInfo) {
  // console.log(`From model ${hotelId}`);
  // console.log(`From model ${JSON.stringify(newHotelObject)}`);
  try{
    const resultData = knexInstance("hotels")
    .where("id", hotelId).andWhere('userId', newHotelObject.userId)
    .update({
      userId: newHotelObject.userId,
      hotelname: newHotelObject.hotelname,
      location: newHotelObject.location,
      established: newHotelObject.established,
      singlerooms: newHotelObject.singlerooms,
      singleroomrate: newHotelObject.singleroomrate,
      doublerooms: newHotelObject.doublerooms,
      doubleroomrate: newHotelObject.doubleroomsrate,
      suites: newHotelObject.suites,
      suiterate: newHotelObject.suitesrate,
      website: newHotelObject.website,
      email: newHotelObject.email,
      phoneno: newHotelObject.phoneno,
      image1: newHotelObject.image1,
      createdat: newHotelObject.createdat,
      updatedat: formattedTime,
    })
    .then(function(data){
      if(data === 1){
        return (200)
      }else{
        return (401)
      }
    });
    return resultData;
  }catch(error){
    console.log(error);
  }
}



export async function getHotelForUser(hotelId: number) {
  const resultData = await knexInstance
    .select("*")
    .from("hotels")
    .where("id", hotelId)
    .then(function (data) {
      return data;
    });
  return resultData;
}