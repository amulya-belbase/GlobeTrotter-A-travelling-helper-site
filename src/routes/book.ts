import express, {Router} from "express";
import fs from "fs";
const pdf = require('html-pdf');
import {
    bookNewHotel,
    myHotels,
    updateMyHotel,
    deleteMyHotel,
    downloadHotel,
    downloadFlight,
    bookNewFlight,
    myFlights,
    updateMyFlight,
    deleteMyFlight,
} from "../controller/book";

const router = Router();

// FOR Hotels
router.post("/bookNewHotel", bookNewHotel);
router.get("/myHotels/:id", myHotels);
router.put("/updateMyHotel/:id", updateMyHotel);
router.delete("/deleteMyHotel/:ids", deleteMyHotel);

// DOWNLOAD PDF routes
router.get("/downloadHotel/:id",downloadHotel);
router.get("/downloadFlight/:id",downloadFlight);

// FOR FLIGHTS
router.post("/bookNewFlight", bookNewFlight);
router.get("/myFlights/:id", myFlights);
router.put("/updateMyFlight/:id", updateMyFlight);
router.delete("/deleteMyFlight/:ids", deleteMyFlight);

export default router; 