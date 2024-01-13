import {Router} from "express";

import usersRoutes from "./users";
import hotelsRoutes from "./hotels";
import flightsRoutes from "./flights";
import bookRoutes from "./book";
import uploadRoutes from "./upload";

const router = Router();

// user route for login and signup
router.use("/users",usersRoutes);

// route for HOTEL CRUD operations
router.use("/hotels", hotelsRoutes);

// route for FLIGHT CRUD operations
router.use("/flights", flightsRoutes);

// route for user bookings
router.use("/book",bookRoutes);

// FOR picture uploads
router.use("/upload", uploadRoutes);



export default router; 