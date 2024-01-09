import express, {Router} from "express";

import {
    addNew
} from "../controller/hotels";

const router = Router();

router.post("/addNew", addNew);

// router.post("/signup", signup);


export default router; 