// ./routes/update.js
// Updates the counts of devices connected to the server

// ===== JSON request format ===================================================

let = {
    "deviceIDs": [
        "device ID 0",
        "device ID 1",
        "device ID 2",
    ]
};

// ===== Route functionality ===================================================

function update(app) {
    app.post("/update", (request, response) => {
        // Get the JSON device list
        let deviceList = request.body["deviceIDs"];

        // Iterate through all devices in the request
        for (let i = 0; i < deviceList.length; i++) {
            // Get the device ID
            let deviceID = deviceList[i];

            // Increment the count of the device
            global.deviceList[deviceID]++;
        }

        // Send a response message
        response
            .status(200) // HTTP status code 200: OK
            .send("OK"); // Response message
    });
}

module.exports = update;