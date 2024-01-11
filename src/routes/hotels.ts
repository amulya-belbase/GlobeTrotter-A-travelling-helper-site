import express, {Router} from "express";

import {
    getAllFilter,
    addNew,
    getHotelsById,
    deleteHotel,
    updateHotel,
} from "../controller/hotels";

const router = Router();

router.get("/getAllFilter/:searchData", getAllFilter);
router.post("/addNew", addNew);
router.get("/getHotelsById/:userId",getHotelsById);
router.delete("/delete/:ids", deleteHotel)
router.put("/update/:id", updateHotel);

export default router; 