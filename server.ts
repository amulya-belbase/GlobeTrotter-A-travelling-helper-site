import express from "express";
import config from "./src/config";
import routes from "./src/routes";
// import {
//     login,
//     signup
// } from "./src/controller/users";


const app = express();

// define middleware before routing
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   userLogger.info('Incoming request', { body: req.body });
//   next();
// });
app.use(routes);

// app.post('/signup', (req,res) => {
//     console.log(req.body);
//       res.redirect('/login.html');
// });

console.log(`Server listening on port: ${config.serverPort}`);

app.listen(config.serverPort);

// import express from "express";

// const app = express();
// const PORT = 8000;

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from the 'public' directory

// // Define a route to serve your HTML file
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/login.html");
// });

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   console.log(`From login page for email: ${email}, for password: ${password}`);
//   res.redirect("/index.html");
// });

// app.post("/signup", (req, res) => {
//   const {
//     email,
//     password,
//     firstname,
//     lastname,
//     gender,
//     role,
//     birthday,
//     profilepic,
//   } = req.body;

//   console.log(`From singup page: email: ${email}, password: ${password}, firstname: ${firstname}, 
//   lastname: ${lastname}, gender: ${gender}, role: ${role}, birthday: ${birthday}, profile: ${profilepic}`);
//   res.redirect("/index.html");

//   // const {email,password} = req.body;
//   // console.log(`From login page for email: ${email}, for password: ${password}`);
//   // res.redirect('/index.html');
// });

// app.post("/", (req, res) => {
//   const { venue, date, zip } = req.body;
//   // res.sendfile(__dirname+'/public/login.html');
//   console.log(
//     `From landing page for venue: ${venue}, for date: ${date}, for zip: ${zip}`
//   );
//   // Redirect to a different URL after successful login
//   res.redirect("/login.html");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
