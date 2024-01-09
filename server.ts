// // Server-side (Express)

// import express from "express";
// import config from "./src/config";

// const app = express();

// app.get("/example", (req, res) => {
//   // Sending a JSON response from the server
//   res.json({ message: "Server response for /example" });
// });

// app.listen(config.serverPort, () => {
//   console.log(`Server listening on port: ${config.serverPort}`);
// });


import express from "express";
import config from "./src/config";
import routes from "./src/routes";


const app = express();

// define middleware before routing
app.use(express.json());

// Needed when the page loads for the first time
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

console.log(`Server listening on port: ${config.serverPort}`);

app.listen(config.serverPort);
