import express, {Router} from "express";

import {
    login,
    signup
} from "../controller/users";
import { sign } from "crypto";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);


export default router; 