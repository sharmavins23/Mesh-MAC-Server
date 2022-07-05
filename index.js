// ./index.js
// Responsible for server object creation via Express.js, as well as any global
//  variable stores

// ===== Imports ===============================================================

// Server functionality and routing
const express = require("express");
// Command-line request formatting and printing
const morgan = require("morgan");

// ===== Global variables ======================================================

// Port number for the server to listen on
global.port = 8080; // See: Wikipedia's list of TCP and UDP port numbers

// Device MAC IDs as well as the count of their responses
global.deviceList = {
    "testProtocol": 0
};

// Navbar to display on the webpages (for easy navigation and testing)
global.navbar = `<html>
    <head>
        <title>Mesh MAC Server</title>
        <style>
            div {
                text-align: center;
                align-items: center;
                justify-content: center;
            }
            table, th, tr, td {
                border: 1px solid black;
                margin: auto;
            }
        </style>
    </head>
    <div>
        <a href="http://localhost:${global.port}/">
            <button>Home></button>
        </a>
    </div>
    <br />`;

// ===== Server initialization and routing =====================================

// Initialize Express server object
const app = express();
// Tell Express to use Morgan for logging requests to the console
app.use(morgan("dev"));

// Dynamically load all routes in the ./routes folder into the server
require("./routes/DLR.js")(app);

// Configure the server to run (BLOCKING looping call)
app.listen(port, () => {
    // Log that our server is running in the terminal
    console.log(`Server running at http://localhost:${global.port}/`);
});