// ./routes/reset.js
// Reset all device response counts to zero to start counting again

// ===== Route functionality ===================================================

function reset(app) {
    app.get("/reset", (request, response) => {
        // Iterate through and set all device response counts to zero
        for (const [key, value] of Object.entries(global.deviceList)) {
            global.deviceList[key]["count"] = 0;
        }

        response
            .status(302) // HTTP status code 302: Redirect
            .redirect("/"); // Redirect back to the homepage for resetting
    });
}

module.exports = reset;