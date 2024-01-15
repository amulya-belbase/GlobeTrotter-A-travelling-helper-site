import {Router} from "express";
import { validateFlightForm,validateUpdateFlightForm } from "../middleware/flightFormValidator";

import {
    getAllFilter,
    addNew,
    getFlightsById,
    deleteFlight,
    updateFlight,
    getFlightForUser,
} from "../controller/flights";

const router = Router();

// FOR ADMIN
router.post("/addNew", validateFlightForm, addNew);
router.get("/getFlightsById/:userId",getFlightsById);
router.delete("/delete/:ids", deleteFlight)
router.put("/update/:id", validateUpdateFlightForm, updateFlight);

// FOR USER Display and filter
router.get("/getAllFilter/:searchData", getAllFilter);

// FOR user dashboard flight picture and update op 
router.get("/getFlightForUser/:id", getFlightForUser)

export default router; 