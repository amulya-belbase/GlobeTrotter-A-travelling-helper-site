import express, {Router} from "express";

import {
    getAllFilter,
    addNew,
    getHotelsById,
    deleteHotel,
    updateHotel,
    getHotelForUser,
} from "../controller/hotels";

const router = Router();

// FOR ADMIN
router.post("/addNew", addNew);
router.get("/getHotelsById/:userId",getHotelsById);
router.delete("/delete/:ids", deleteHotel)
router.put("/update/:id", updateHotel);

// FOR USER
router.get("/getAllFilter/:searchData", getAllFilter);


router.get("/getHotelForUser/:id", getHotelForUser)

export default router; 