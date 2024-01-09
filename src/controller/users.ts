import { Request, Response } from "express";

// data validation without middleware
// import { ValidationError } from 'joi';
// import {loginSchema, signupSchema} from "../schema/userValidation";

import * as userService from "../service/users";

export const signup = async (req: Request, res: Response) => {
  const result = req.body;
  // const result = await signupSchema.validateAsync(req.body);
  try {
    const data = await userService.signup(
      result.email,
      result.password,
      result.firstname,
      result.lastname,
      result.dateofbirth,
      result.gender,
      result.profilepic,
      result.role
    );
    if (data === 200) {
      res.status(200).json({message:"Signup Successful"});
    } else {
      res.status(422).json(data);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = req.body;
    const data = await userService.login(result.email, result.password);
    if (data !== 401 && data !== 404) {
      res.status(200).json(data);
    } else if (data === 401) {
      res.status(401).json({ error: "Invalid Credentials" });
    } else if (data === 404) {
      res.status(404).json({ error: "User doesnt exist" });
    }
  } catch (error) {
    res.status(500).json({ error });

    // if (error instanceof ValidationError && error.isJoi) {
    //     // Handle Joi validation error
    //     return res.status(422).json({message:"Invalid data"})
    //   } else {
    //     // Handle other types of errors
    //     res.status(500).json({message:"Internal server error"});
    //   }
  }
};
