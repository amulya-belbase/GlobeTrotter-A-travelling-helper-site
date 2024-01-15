import { Request, Response } from "express";

import * as flightService from "../service/flights";
import { UpdateFlightInfo } from "../interface/flightInterface";

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
      res.status(200).json({ message: "Flight registered Successfully" });
    } else {
      res.status(422).json(data);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getFlightsById = async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  try {
    const data = await flightService.getFlightsById(userId);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteFlight = async (req: Request, res: Response) => {
  // const flightId = Number(req.params.id);
  const { ids } = req.params;
  const idArray = ids.split(",").map(Number);
  const flightId = idArray[0];
  const userId = idArray[1];
  if (!Number.isNaN(flightId)) {
    try {
      const data = await flightService.deleteFlight(flightId, userId);
      if (data === 401) {
        res.status(401).json({ message: "Unauthorized request" });
      } else if (data === 200) {
        res.status(200).json({ message: "Flight deleted Successfully" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(422).json({ message: "Delete Id must be a number" });
  }
};

export const updateFlight = async (req: Request, res: Response) => {
  const flightId = Number(req.params.id);
  const result = req.body;
  const newFlightObject: UpdateFlightInfo = {
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
    createdat: result.createdat,
  };

  try {
    const data = await flightService.updateFlight(flightId, newFlightObject);
    if (data === 200) {
      res.status(200).json({ message: "Flight deleted Successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized request" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAllFilter = async (req: Request, res: Response) => {
  const result = req.params.searchData;
  const filterArray = result.split(",").map(String);
  const deptValue = filterArray[0];
  const destValue = filterArray[1];
  const searchValue = filterArray[2];
  // console.log(`${deptValue} is departure, ${destValue} is destination, ${searchValue} is search`)
  try {
    const data = await flightService.getAllFilter(
      deptValue,
      destValue,
      searchValue
    );
    if (data === 404) {
      res.status(404).json({ message: "No Flights found" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getFlightForUser = async (req: Request, res: Response) => {
  const flightId = Number(req.params.id);
  try {
    const data = await flightService.getFlightForUser(flightId);
    // console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
