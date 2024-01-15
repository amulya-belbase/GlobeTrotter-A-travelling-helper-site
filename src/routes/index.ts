import {Router} from "express";
import * as jwt from "jsonwebtoken";
import usersRoutes from "./users";
import hotelsRoutes from "./hotels";
import flightsRoutes from "./flights";
import bookRoutes from "./book";
import uploadRoutes from "./upload";
import config from "../config";

const router = Router();

// user route for login and signup
router.use("/users",usersRoutes);

// route for ADMIN HOTEL CRUD operations
router.use("/hotels", hotelsRoutes);

// route for ADMIN FLIGHT CRUD operations
router.use("/flights", flightsRoutes);

// route for user bookings
router.use("/book",bookRoutes);

// FOR picture uploads
router.use("/upload", uploadRoutes);


// parse access token for index page
router.get('/parseAccessToken/:access', (req,res) => {
    const token = req.params.access;
    try {
       const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
       const userData = decoded;
       console.log('Decoded Data:', userData);
       res.status(200).json(userData);
    } catch (error) {
       console.error('Token Verification Error:', error);
       res.status(401).json({ error: 'Token verification failed' });
    }
})


export default router; 