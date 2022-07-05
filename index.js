// ./index.js
// Responsible for server object creation via Express.js, as well as any global
//  variable stores

// ===== Imports ===============================================================

// Server functionality and routing
import express from "express";
// Command-line request formatting and printing
import morgan from "morgan";

// ===== Global variables ======================================================

// Device MAC IDs as well as the count of their responses
global.deviceList = {
    "testProtocol": 0
};

// Navbar to display on the webpages (for easy navigation and testing)
global.navbar = `<div>
    <a href="http://localhost:${port}/">
        <button>Home></button>
    </a>
</div>`;

// ===== Server initialization and routing =====================================

// Initialize Express server object
const app = express();
// Tell Express to use Morgan for logging requests to the console
app.use(morgan("dev"));

// Create the port number for the server to listen on
const port = 8080; // See: Wikipedia's List of TCP and UDP port numbers

// Dynamically load all routes in the ./routes folder into the server
require("./routes/DLR.js")(app);

// Configure the server to run (BLOCKING looping call)
app.listen(port, () => {
    // Log that our server is running in the terminal
    console.log(`Server running at http://localhost:${port}/`);
});