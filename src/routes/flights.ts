import express, {Router} from "express";

import {
    getAllFilter,
    addNew,
    getFlightsById,
    deleteFlight,
    updateFlight,
    getFlightForUser,
} from "../controller/flights";

const router = Router();

router.post("/addNew", addNew);
router.get("/getFlightsById/:userId",getFlightsById);
router.delete("/delete/:ids", deleteFlight)
router.put("/update/:id", updateFlight);


router.get("/getAllFilter/:searchData", getAllFilter);

router.get("/getFlightForUser/:id", getFlightForUser)

export default router; 