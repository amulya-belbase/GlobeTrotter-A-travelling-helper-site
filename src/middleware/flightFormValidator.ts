import { createFlightSchema,updateFlightSchema } from "../schema/flightFormValidation";
import { ValidationError } from 'joi';
import { Request, Response, NextFunction } from "express";


// middleware for flight validation -> validateFlightForm for POST methods

export async function validateFlightForm(req: Request, res: Response, next: NextFunction) {
  try{
    const result = await createFlightSchema.validateAsync(req.body);
    req.body = result;
    // console.log(`flight form middleware ${result}`)
    next();
  }
    catch(error){
      if (error instanceof ValidationError && error.isJoi) {
        console.log(error)
          // Handle Joi validation error
          return res.status(422).json({message:error.details[0].message})
        } else {
          // Handle other types of errors
          res.status(500).json({message:"Internal server error"});
        }
      }
  };

  export async function validateUpdateFlightForm(req: Request, res: Response, next: NextFunction) {
    try{
      const result = await updateFlightSchema.validateAsync(req.body);
      req.body = result;
      // console.log(`hotel form middleware ${result}`)
      next();
    }
      catch(error){
        if (error instanceof ValidationError && error.isJoi) {
          // console.log(error.details[0].message)
            // Handle Joi validation error
            return res.status(422).json({message:error.details[0].message})
          } else {
            // Handle other types of errors
            res.status(500).json({message:"Internal server error"});
          }
        }
    };


