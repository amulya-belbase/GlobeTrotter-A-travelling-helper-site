import { baseKnexConfig } from "../knexFile";
import knex from "knex";
import { DateTime } from "luxon";
import { BookHotelInfo, UpdateHotelBooking, BookFlightInfo, UpdateFlightBooking } from "../interface/bookInterface";

const knexInstance = knex(baseKnexConfig);

const desiredTimezone = "Asia/Kathmandu";
const currentTimeInDesiredZone = DateTime.now().setZone(desiredTimezone);
const formattedTime = currentTimeInDesiredZone.toFormat("yyyy-MM-dd HH:mm:ss");

// FOR HOTELS
export async function bookNewHotel(result: BookHotelInfo) {
  try {
    const databaseInsert = await knexInstance
      .insert({
        userId: result.userId,
        hotelId: result.hotelId, 
        hotelname: result.hotelname,
        arrivalDate: result.arrivalDate,
        room_type: result.room_type,
        room_rate: result.room_rate,
        room_count: result.room_count,
        createdat: formattedTime,
        updatedat: formattedTime,
      })
      .into("users_hotels")
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


export async function myHotels(userId: number) {
  try{
    const resultData = await knexInstance
      .select("*")
      .from("users_hotels")
      .where("userId", userId)
      .then(function (data) {
        return data;
      });
    return resultData;
  }
  catch(error){
    console.log(error);
  }
}



export async function updateMyHotel(id: number, newHotelObject: UpdateHotelBooking) {
  // console.log(`From model ${hotelId}`);
  // console.log(`From model ${JSON.stringify(newHotelObject)}`);
  try{
    const resultData = knexInstance("users_hotels")
    .where("id", id).andWhere('userId', newHotelObject.userId)
    .update({
      userId: newHotelObject.userId,
      hotelId: newHotelObject.hotelId, 
      hotelname: newHotelObject.hotelname,
      arrivalDate: newHotelObject.arrivalDate,
      room_type: newHotelObject.room_type,
      room_rate: newHotelObject.room_rate,
      room_count: newHotelObject.room_count,
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


export async function deleteMyHotel(entryId: number,userId:number) {
  // console.log(`From model: userId ${userId} & entryId: ${entryId}`);
  try {
    const resultData = await knexInstance("users_hotels")
      .where("id", entryId).andWhere('userId', userId)
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


export async function downloadHotel(dataId: number) {
  try{
    const resultData = await knexInstance
      .select("*")
      .from("users_hotels")
      .where("id", dataId)
      .then(function (data) {
        return data;
      });
    return resultData;
  }
  catch(error){
    console.log(error);
  }
}

export async function downloadFlight(dataId: number) {
  try{
    const resultData = await knexInstance
      .select("*")
      .from("users_flights")
      .where("id", dataId)
      .then(function (data) {
        return data;
      });
    return resultData;
  }
  catch(error){
    console.log(error);
  }
}



// FOR FLIGHTS

export async function bookNewFlight(result: BookFlightInfo) {
  try {
    const databaseInsert = await knexInstance
      .insert({
        userId:result.userId,
        flightId:result.flightId, 
        flightname:result.flightname,
        departureDate:result.departureDate,
        seat_type:result.seat_type,
        seat_rate: result.seat_rate,
        seat_count: result.seat_count,
        createdat: formattedTime,
        updatedat: formattedTime,
      })
      .into("users_flights")
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

export async function myFlights(userId: number) {
  try{
    const resultData = await knexInstance
      .select("*")
      .from("users_flights")
      .where("userId", userId)
      .then(function (data) {
        return data;
      });
    return resultData;
  }
  catch(error){
    console.log(error);
  }
}


export async function updateMyFlight(id: number, newHotelObject: UpdateFlightBooking) {
  // console.log(`From model ${hotelId}`);
  // console.log(`From model ${JSON.stringify(newHotelObject)}`);
  try{
    const resultData = knexInstance("users_flights")
    .where("id", id).andWhere('userId', newHotelObject.userId)
    .update({
      userId: newHotelObject.userId,
      flightId: newHotelObject.flightId, 
      flightname: newHotelObject.flightname,
      departureDate: newHotelObject.departureDate,
      seat_type: newHotelObject.seat_type,
      seat_rate: newHotelObject.seat_rate,
      seat_count: newHotelObject.seat_count,
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

export async function deleteMyFlight(entryId: number,userId:number) {
  // console.log(`From model: userId ${userId} & entryId: ${entryId}`);
  try {
    const resultData = await knexInstance("users_flights")
      .where("id", entryId).andWhere('userId', userId)
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