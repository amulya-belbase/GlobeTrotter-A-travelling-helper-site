import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as flightService from "../service/flights";
import { FlightInfo, UpdateFlightInfo } from "../interface/flightInterface";

export const addNew = async (req: Request, res: Response) => {
  const result = req.body;
  try {
    const data = await flightService.addNew(
      result.userId,
      result.flightname,
      result.flightdepart,
      result.flightdest,
      result.economy,
      result.economyrate,
      result.business,
      result.businessrate,
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



export const getFlightsById = async (req:Request, res: Response) => {
  const userId = Number(req.params.userId); 
  try {
    const data = await flightService.getFlightsById(userId);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const deleteFlight = async (req:Request, res: Response) => {
  const flightId = Number(req.params.id); 
  // console.log(hotelId);
  try {
    const data = await flightService.deleteFlight(flightId);
    // console.log(data);
    res.status(200).json({message:"Flight deleted Successfully"});
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const updateFlight = async (req:Request, res: Response) => {
  const flightId = Number(req.params.id); 
  const result = req.body;
  const newFlightObject:UpdateFlightInfo = {
    userId:result.userId,
    flightname:result.flightname, 
    flightdepart:result.flightdepart,
    flightdest:result.flightdest,
    economy:result.economy,
    economyrate: result.economyrate,
    business: result.business,
    businessrate: result.businessrate,
    website:result.website,
    email:result.email,
    phoneno:result.phoneno,
    image1:result.image1,
    createdat:result.createdat,
};

  try {
    const data = await flightService.updateFlight(flightId,newFlightObject);
    console.log(data);
    res.status(200).json({message:"Flight updated Successfully"});
  } catch (error) {
    res.status(500).json({ error });
  }
}