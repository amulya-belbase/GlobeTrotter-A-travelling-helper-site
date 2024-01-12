import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as bookService from "../service/book";
import { BookHotelInfo, UpdateHotelBooking, UpdateFlightBooking } from "../interface/bookInterface";


// FOR HOTELS

export const bookNewHotel = async (req: Request, res: Response) => {
    const result = req.body;

    try {
      const data = await bookService.bookNewHotel(
        result.userId,
        result.hotelId,
        result.hotelname,
        result.arrivalDate,
        result.room_type,
        result.room_rate,
        result.room_count
      );
      if (data === 200) {
        res.status(200).json({message:"Hotel booked Successfully"});
      } else {
        res.status(422).json(data);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  export const myHotels = async (req:Request, res: Response) => {
    const userId = Number(req.params.id); 
    try {
      const data = await bookService.myHotels(userId);
      // console.log(data);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }


  export const updateMyHotel = async (req:Request, res: Response) => {
    const id = Number(req.params.id); 
    const result = req.body;
    const newHotelObject:UpdateHotelBooking = {
      userId:result.userId,
      hotelId:result.hotelId,
      hotelname:result.hotelname,
      arrivalDate:result.arrivalDate,
      room_type:result.room_type,
      room_rate:result.room_rate,
      room_count:result.room_count,
      createdat:result.createdat
  };  
    try {
      const data = await bookService.updateMyHotel(id,newHotelObject);
      if(data === 200){
        res.status(200).json({message:"Hotel deleted Successfully"});
      }else{
        res.status(401).json({message:"Unauthorized request"})
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  
  export const deleteMyHotel = async (req:Request, res: Response) => {
    // const hotelId = Number(req.params.id); 
    const { ids } = req.params;
    const idArray = ids.split(',').map(Number); 
    const entryId = idArray[0];
    const userId = idArray[1];
    try {
      const data = await bookService.deleteMyHotel(entryId,userId);
      if(data === 401){
        res.status(401).json({message:"Unauthorized request"})
      }else if(data === 200){
        res.status(200).json({message:"Hotel deleted Successfully"});
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }


  // FOR FLIGHTS

  export const bookNewFlight = async (req: Request, res: Response) => {
    const result = req.body;

    try {
      const data = await bookService.bookNewFlight(
        result.userId,
        result.flightId,
        result.flightname,
        result.departureDate,
        result.seat_type,
        result.seat_rate,
        result.seat_count
      );
      if (data === 200) {
        res.status(200).json({message:"Hotel booked Successfully"});
      } else {
        res.status(422).json(data);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  
  export const myFlights = async (req:Request, res: Response) => {
    const userId = Number(req.params.id); 
    try {
      const data = await bookService.myFlights(userId);
      // console.log(data);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  
  export const updateMyFlight = async (req:Request, res: Response) => {
    const id = Number(req.params.id); 
    const result = req.body;
    const newHotelObject:UpdateFlightBooking = {
      userId:result.userId,
      flightId:result.flightId, 
      flightname:result.flightname,
      departureDate:result.departureDate,
      seat_type:result.seat_type,
      seat_rate: result.seat_rate,
      seat_count: result.seat_count,
      createdat:result.createdat,
  };  
    try {
      const data = await bookService.updateMyFlight(id,newHotelObject);
      if(data === 200){
        res.status(200).json({message:"Flight deleted Successfully"});
      }else{
        res.status(401).json({message:"Unauthorized request"})
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  
  export const deleteMyFlight = async (req:Request, res: Response) => {
    // const hotelId = Number(req.params.id); 
    const { ids } = req.params;
    const idArray = ids.split(',').map(Number); 
    const entryId = idArray[0];
    const userId = idArray[1];
    try {
      const data = await bookService.deleteMyFlight(entryId,userId);
      if(data === 401){
        res.status(401).json({message:"Unauthorized request"})
      }else if(data === 200){
        res.status(200).json({message:"Flight deleted Successfully"});
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }