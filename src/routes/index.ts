import {Router} from "express";

// import {authenticateToken, refreshActionToken} from "../middleware/authToken";
// import todoRoutes from "./todo";
import usersRoutes from "./users";

const router = Router();

// router.use(express.static('public'));
// router.use(express.urlencoded({ extended: true }));

// to do CRUD operations on todo list, you need to login first, authenticateToken is the middleware that verifies login access
// router.use("/todo", authenticateToken, todoRoutes);
  
// // for user login and signup 
router.use("/users",usersRoutes);

// // this endpoint refreshes access token 
// router.post("/token", refreshActionToken);

// Serve static files from the 'public' directory

// Define a route to serve your HTML file
// router.get('/', (req, res) => {
//     res.sendFile(__dirname+'/public/login.html');
//   });
  
  

  
//   router.post('/',(req,res) => {
//     const {venue, date, zip} = req.body;
//     // res.sendfile(__dirname+'/public/login.html');
//     console.log(`From landing page for venue: ${venue}, for date: ${date}, for zip: ${zip}`);  
//       // Redirect to a different URL after successful login
//       res.redirect('/login.html'); 
//     });


export default router; 