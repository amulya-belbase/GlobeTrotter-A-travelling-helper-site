import {Router} from "express";

// import {authenticateToken, refreshActionToken} from "../middleware/authToken";
// import todoRoutes from "./todo";
import usersRoutes from "./users";
import hotelsRoutes from "./hotels";
import flightsRoutes from "./flights";

const router = Router();

// user route for login and signup
router.use("/users",usersRoutes);

// route for HOTEL CRUD operations
router.use("/hotels", hotelsRoutes);

// route for FLIGHT CRUD operations
router.use("/flights", flightsRoutes);


export default router; 