import express, {Router} from "express";

import {
    addNew,
    getFlightsById,
    deleteFlight,
    updateFlight,
} from "../controller/flights";

const router = Router();

router.post("/addNew", addNew);
router.get("/getFlightsById/:userId",getFlightsById);
router.delete("/delete/:id", deleteFlight)
router.put("/update/:id", updateFlight);

export default router; 