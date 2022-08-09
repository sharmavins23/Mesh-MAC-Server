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
    "testProtocol": {
        "count": 0,
        "temperature": 0,
        "freeHeapMem": 0,
        "maxContigFreeHeapMem": 0,
        "lastResetReason": "",
        "tsfTimeStampDiff": 0,
    }
};

// ESP reset reason code enumeration
global.resetReasons = [
    "Reset reason can not be determined",
    "Reset due to power-on event",
    "Reset by external pin (not applicable for ESP32)",
    "Software reset via esp_restart",
    "Software reset due to exception/panic",
    "Reset (software or hardware) due to interrupt watchdog",
    "Reset due to task watchdog",
    "Reset due to other watchdogs",
    "Reset after exiting deep sleep mode",
    "Brownout reset (software or hardware)",
    "Reset over SDIO",
]

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
            <button>Home</button>
        </a>
        <a href="http://localhost:${global.port}/reset">
            <button>Reset Counts</button>
        </a>
    </div>
    <br />`;

// ===== Server initialization and routing =====================================

// Initialize Express server object
const app = express();
// Tell Express to use Morgan for logging requests to the console
app.use(morgan("dev"));
// Tell Express that we're getting in JSON formats
app.use(express.json());

// Dynamically load all routes in the ./routes folder into the server
require("./routes/DLR.js")(app);

// Configure the server to run (BLOCKING looping call)
app.listen(port, () => {
    // Log that our server is running in the terminal
    console.log(`Server running at http://localhost:${global.port}/`);
});