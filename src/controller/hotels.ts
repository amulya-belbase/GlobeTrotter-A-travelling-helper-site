import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as hotelService from "../service/hotels";
import { HotelInfo, UpdateHotelInfo } from "../interface/hotelInterface";

export const getAllFilter = async (req:Request, res:Response) => {
  const result = req.params.searchData;
  const filterArray = result.split(',').map(String); 
  const locationValue = filterArray[0];
  const searchValue = filterArray[1];
  try{
    const data = await hotelService.getAllFilter(locationValue,searchValue);
    if (data === 404) {
      res.status(404).json({message:"No Hotels found"});
    } else {
      res.status(200).json(data);
    }
  }
  catch(error){
    res.status(500).json({ error });
  }
}


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
  // const hotelId = Number(req.params.id); 
  const { ids } = req.params;
  const idArray = ids.split(',').map(Number); 
  const hotelId = idArray[0];
  const userId = idArray[1];
  try {
    const data = await hotelService.deleteHotel(hotelId,userId);
    if(data === 401){
      res.status(401).json({message:"Unauthorized request"})
    }else if(data === 200){
      res.status(200).json({message:"Hotel deleted Successfully"});
    }
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
    if(data === 200){
      res.status(200).json({message:"Hotel deleted Successfully"});
    }else{
      res.status(401).json({message:"Unauthorized request"})
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}