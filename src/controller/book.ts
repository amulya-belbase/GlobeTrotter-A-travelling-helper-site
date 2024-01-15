import { Request, Response } from "express";
import fs from "fs";
const pdf = require("html-pdf");

import * as bookService from "../service/book";
import {
  UpdateHotelBooking,
  UpdateFlightBooking,
} from "../interface/bookInterface";

// FOR HOTELS

export const bookNewHotel = async (req: Request, res: Response) => {
  const result = req.body;
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.bookNewHotel(
        userId,
        result.hotelId,
        result.hotelname,
        result.arrivalDate,
        result.room_type,
        result.room_rate,
        result.room_count
      );
      if (data === 200) {
        res.status(200).json({ message: "Hotel booked Successfully" });
      } else {
        res.status(422).json(data);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const myHotels = async (req: Request, res: Response) => {
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.myHotels(userId);
      // console.log(data);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const updateMyHotel = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userData.id;
  const userRole = req.userData.role;
  const result = req.body;
  if (userRole === "traveller") {
    const newHotelObject: UpdateHotelBooking = {
      userId: userId,
      hotelId: result.hotelId,
      hotelname: result.hotelname,
      arrivalDate: result.arrivalDate,
      room_type: result.room_type,
      room_rate: result.room_rate,
      room_count: result.room_count,
      createdat: result.createdat,
    };
    try {
      const data = await bookService.updateMyHotel(id, newHotelObject);
      if (data === 200) {
        res.status(200).json({ message: "Hotel updated Successfully" });
      } else {
        res.status(401).json({ message: "Unauthorized request" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const deleteMyHotel = async (req: Request, res: Response) => {
  // const hotelId = Number(req.params.id);
  const { ids } = req.params;
  const idArray = ids.split(",").map(Number);
  const entryId = idArray[0];
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.deleteMyHotel(entryId, userId);
      if (data === 401) {
        res.status(401).json({ message: "Unauthorized request" });
      } else if (data === 200) {
        res.status(200).json({ message: "Hotel deleted Successfully" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

// FOR FLIGHTS

export const bookNewFlight = async (req: Request, res: Response) => {
  const result = req.body;
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.bookNewFlight(
        userId,
        result.flightId,
        result.flightname,
        result.departureDate,
        result.seat_type,
        result.seat_rate,
        result.seat_count
      );
      if (data === 200) {
        res.status(200).json({ message: "Hotel booked Successfully" });
      } else {
        res.status(422).json(data);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const myFlights = async (req: Request, res: Response) => {
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.myFlights(userId);
      // console.log(data);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const updateMyFlight = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userData.id;
  const userRole = req.userData.role;
  const result = req.body;
  if (userRole === "traveller") {
    const newHotelObject: UpdateFlightBooking = {
      userId: userId,
      flightId: result.flightId,
      flightname: result.flightname,
      departureDate: result.departureDate,
      seat_type: result.seat_type,
      seat_rate: result.seat_rate,
      seat_count: result.seat_count,
      createdat: result.createdat,
    };
    // console.log(id, newHotelObject)
    try {
      const data = await bookService.updateMyFlight(id, newHotelObject);
      if (data === 200) {
        res.status(200).json({ message: "Flight updated Successfully" });
      } else {
        res.status(401).json({ message: "Unauthorized request" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

export const deleteMyFlight = async (req: Request, res: Response) => {
  // const hotelId = Number(req.params.id);
  const { ids } = req.params;
  const idArray = ids.split(",").map(Number);
  const entryId = idArray[0];
  const userId = req.userData.id;
  const userRole = req.userData.role;
  if (userRole === "traveller") {
    try {
      const data = await bookService.deleteMyFlight(entryId, userId);
      if (data === 401) {
        res.status(401).json({ message: "Unauthorized request" });
      } else if (data === 200) {
        res.status(200).json({ message: "Flight deleted Successfully" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(401).json({ message: "Unauthorized request" });
  }
};

// TO DOWNLOAD HOTEL ITINERARY
export const downloadHotel = async (req: Request, res: Response) => {
  const dataId = Number(req.params.id);
  try {
    const data = await bookService.downloadHotel(dataId);

    const templatePath = "./public/downloadTemplate/hotelDownload.html";

    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    let populatedHtml = htmlTemplate;
    if (data && data.length > 0) {
      populatedHtml = htmlTemplate
        .replace(/{{id}}/g, data[0].id)
        .replace(/{{userId}}/g, data[0].userId)
        .replace(/{{hotelId}}/g, data[0].hotelId)
        .replace(/{{arrivalDate}}/g, data[0].arrivalDate)
        .replace(/{{hotelname}}/g, data[0].hotelname)
        .replace(/{{room_type}}/g, data[0].room_type)
        .replace(/{{room_rate}}/g, data[0].room_rate)
        .replace(/{{room_count}}/g, data[0].room_count)
        .replace(/{{createdat}}/g, data[0].createdat)
        .replace(/{{updatedat}}/g, data[0].updatedat);
    } else {
      console.error("Data is undefined or empty");
    }

    const options = {
      format: "Letter",
    };

    // Convert HTML to PDF and stream it directly to the response
    // Assuming 'populatedHtml' is the HTML content with placeholders replaced
    pdf
      .create(populatedHtml, options)
      .toStream((pdfErr: Error, stream: NodeJS.ReadableStream) => {
        if (pdfErr) {
          console.log(pdfErr);
          res.status(500).json({ error: "PDF creation failed" });
        } else {
          // Set response headers
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=invoice.pdf"
          );

          // for efficient memory mgmt to handle large PDFs -> toStream
          // if you need to store whole pdf first in the memory -> perhaps for further processing -> toBuffer
          // pipe() -> from readable stream (rendered pdf content) to writeable stream (response)
          stream.pipe(res);
        }
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TO DOWNLOAD FLIGHT ITINERARY
export const downloadFlight = async (req: Request, res: Response) => {
  const dataId = Number(req.params.id);
  try {
    const data = await bookService.downloadFlight(dataId);

    const templatePath = "./public/downloadTemplate/flightDownload.html";

    const htmlTemplate = fs.readFileSync(templatePath, "utf8");

    let populatedHtml = htmlTemplate;
    if (data && data.length > 0) {
      populatedHtml = htmlTemplate
        .replace(/{{id}}/g, data[0].id)
        .replace(/{{userId}}/g, data[0].userId)
        .replace(/{{flightId}}/g, data[0].flightId)
        .replace(/{{departureDate}}/g, data[0].departureDate)
        .replace(/{{flightname}}/g, data[0].flightname)
        .replace(/{{seat_type}}/g, data[0].seat_type)
        .replace(/{{seat_rate}}/g, data[0].seat_rate)
        .replace(/{{seat_count}}/g, data[0].seat_count)
        .replace(/{{createdat}}/g, data[0].createdat)
        .replace(/{{updatedat}}/g, data[0].updatedat);
    } else {
      console.error("Data is undefined or empty");
    }

    const options = {
      format: "Letter",
    };

    pdf
      .create(populatedHtml, options)
      .toStream((pdfErr: Error, stream: NodeJS.ReadableStream) => {
        if (pdfErr) {
          console.log(pdfErr);
          res.status(500).json({ error: "PDF creation failed" });
        } else {
          // Set response headers
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=invoice.pdf"
          );

          stream.pipe(res);
        }
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};
