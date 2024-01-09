import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as hotelService from "../service/hotels";

export const addNew = async (req: Request, res: Response) => {
  const result = req.body;
  const data = await hotelService.addNew(
    result.hotelname,
    result.location,
    result.established,
    result.singlerooms,
    result.singleroomrate,
    result.doublerooms,
    result.doubleroomsrate,
    result.suites,
    result.suitesrate,
    result.website,
    result.email,
    result.phoneno,
    result.image1
  );
  return data; 
};
