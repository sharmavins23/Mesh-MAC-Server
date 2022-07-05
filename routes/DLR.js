// ./routes/DLR.js
// On startup, iterates through all files excluding this one and loads them into
//  the Express server object

// ===== Imports ===============================================================

// File indexing, built-in to Node
import fs from "fs";

// ===== Route functionality ===================================================

function dynamicallyLoadRoutes(app) {
    // Read all filenames in current folder and apply this function to them
    fs.readdirSync(__dirname).forEach((file) => {
        // Make sure we skip this file, as well as all non-JS files
        if (
            file === "DLR.js" ||
            file.substr(file.lastIndexOf(".") + 1) !== "js"
        ) return;

        // Grab the name of the file
        let name = file.substr(0, file.indexOf("."));
        // Add the route file to the imports
        require("./" + name)(app);
    });
}

// Export this function to be used in the top level index
module.exports = dynamicallyLoadRoutes;