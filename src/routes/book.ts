import {Router} from "express";
import {authenticateToken, authenticateTokenParams} from "../middleware/auth";

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
router.post("/bookNewHotel", authenticateToken, bookNewHotel);
router.get("/myHotels/:id", authenticateTokenParams, myHotels);
router.put("/updateMyHotel/:id", authenticateToken, updateMyHotel);
router.delete("/deleteMyHotel/:ids", authenticateTokenParams, deleteMyHotel);

// DOWNLOAD PDF routes
router.get("/downloadHotel/:id",downloadHotel);
router.get("/downloadFlight/:id",downloadFlight);

// FOR FLIGHTS
router.post("/bookNewFlight", authenticateToken, bookNewFlight);
router.get("/myFlights/:id", authenticateTokenParams, myFlights);
router.put("/updateMyFlight/:id", authenticateToken, updateMyFlight);
router.delete("/deleteMyFlight/:ids", authenticateTokenParams, deleteMyFlight);

export default router; 