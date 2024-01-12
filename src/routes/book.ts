import express, {Router} from "express";

import {
    bookNewHotel,
    myHotels,
    updateMyHotel,
    deleteMyHotel,
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

// FOR FLIGHTS
router.post("/bookNewFlight", bookNewFlight);
router.get("/myFlights/:id", myFlights);
router.put("/updateMyFlight/:id", updateMyFlight);
router.delete("/deleteMyFlight/:ids", deleteMyFlight);

export default router; 