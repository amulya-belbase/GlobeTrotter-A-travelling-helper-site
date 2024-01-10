import express, {Router} from "express";

import {
    addNew,
    getHotelsById,
    deleteHotel,
    updateHotel,
} from "../controller/hotels";

const router = Router();

router.post("/addNew", addNew);
router.get("/getHotelsById/:userId",getHotelsById);
router.delete("/delete/:ids", deleteHotel)
router.put("/update/:id", updateHotel);

export default router; 