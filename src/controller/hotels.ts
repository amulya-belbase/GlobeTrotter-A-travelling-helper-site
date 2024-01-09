import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as hotelService from "../service/hotels";
import { HotelInfo, UpdateHotelInfo } from "../interface/hotelInterface";

export const addNew = async (req: Request, res: Response) => {
  const result = req.body;
  try {
    const data = await hotelService.addNew(
      result.userId,
      result.hotelname,
      result.location,
      result.established,
      result.singleroom,
      result.singleroomrate,
      result.doubleroom,
      result.doubleroomrate,
      result.suite,
      result.suiterate,
      result.website,
      result.email,
      result.phoneno,
      result.image1
    );
    if (data === 200) {
      res.status(200).json({message:"Hotel registered Successfully"});
    } else {
      res.status(422).json(data);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};



export const getHotelsById = async (req:Request, res: Response) => {
  const userId = Number(req.params.userId); 
  try {
    const data = await hotelService.getHotelsById(userId);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}
export const deleteHotel = async (req:Request, res: Response) => {
  const hotelId = Number(req.params.id); 
  // console.log(hotelId);
  try {
    const data = await hotelService.deleteHotel(hotelId);
    // console.log(data);
    res.status(200).json({message:"Hotel deleted Successfully"});
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const updateHotel = async (req:Request, res: Response) => {
  const hotelId = Number(req.params.id); 
  const result = req.body;
  const newHotelObject:UpdateHotelInfo = {
    userId: result.userId,
    hotelname: result.hotelname,
    location: result.location,
    established: result.established,
    singlerooms: result.singleroom,
    singleroomrate: result.singleroomrate,
    doublerooms: result.doubleroom,
    doubleroomsrate: result.doubleroomrate,
    suites: result.suite,
    suitesrate: result.suiterate,
    website: result.website,
    email: result.email,
    phoneno: result.phoneno,
    image1: result.image1,
    createdat:result.createdat,
};

  try {
    const data = await hotelService.updateHotel(hotelId,newHotelObject);
    console.log(data);
    res.status(200).json({message:"Hotel updated Successfully"});
  } catch (error) {
    res.status(500).json({ error });
  }
}