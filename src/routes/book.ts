import express, {Router} from "express";

import {
    bookNewHotel,
    myHotels,
    updateMyHotel,
    deleteMyHotel,
    bookNewFlight,
} from "../controller/book";

const router = Router();

// FOR Hotels
router.post("/bookNewHotel", bookNewHotel);
router.get("/myHotels/:id", myHotels);
router.put("/updateMyHotel/:id", updateMyHotel);
router.delete("/deleteMyHotel/:ids", deleteMyHotel);

// FOR FLIGHTS
router.post("/bookNewFlight", bookNewFlight);

export default router; 