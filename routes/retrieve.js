// ./routes/retrieve.js
// Retrieves the count of the corresponding device from the server; Updates the
//  server's count as well

// ===== JSON request format ===================================================

let = {
    "deviceID": "device ID"
};

// ===== Route functionality ===================================================

function retrieve(app) {
    app.get("/retrieve", (request, response) => {
        // Get the JSON device ID
        let deviceID = request.body["deviceID"];

        // Check if the device is already in the list
        if (deviceID in global.deviceList) {
            // If so, update the count
            global.deviceList[deviceID]++;
        } else {
            // If not, add the device in
            global.deviceList[deviceID] = 1;
        }

        // Send the count back
        response
            .status(200) // HTTP status code 200: OK
            .send({
                "id": deviceID,
                "count": global.deviceList[deviceID]
            }); // Response message
    });
}

module.exports = retrieve;