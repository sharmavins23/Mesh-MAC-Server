// ./routes/update.js
// Updates the counts of devices connected to the server

// ===== JSON request format ===================================================

let = {
    "deviceID": "device_ID MAC",
    "temperature": 0,
    "freeHeapMem": 0,
    "maxContigFreeHeapMem": 0,
    "lastResetReason": "last_reset_reason",
    "tsfTimeStamp": 0,
};

// ===== Route functionality ===================================================

function update(app) {
    app.post("/update", (request, response) => {
        // Check if the device is already in the list
        if (deviceID in global.deviceList) {
            // Increment the count of the device
            global.deviceList[deviceID]["count"] += 1;
        } else {
            // Add the device to the list
            global.deviceList[deviceID] = {
                "count": 1,
            }
        }

        // Unpack the JSON object
        // ! The temperature JSON object is not properly functional
        let temperature = request.body["temperature"];
        let freeHeapMem = request.body["freeHeapMem"];
        let maxContigFreeHeapMem = request.body["maxContigFreeHeapMem"];
        let lastResetReason = request.body["lastResetReason"];

        // Update the basic information of the table from the device
        global.deviceList[deviceID]["temperature"] = temperature;
        global.deviceList[deviceID]["freeHeapMem"] = freeHeapMem;
        global.deviceList[deviceID]["maxContigFreeHeapMem"] = maxContigFreeHeapMem;
        global.deviceList[deviceID]["lastResetReason"] = lastResetReason;

        // Compute the timestamp difference between the device and server
        let reportedTSF = request.body["tsfTimeStamp"];
        let serverTSF = Math.floor(Date.now() / 1000);
        let timeDiff = serverTSF - reportedTSF;
        global.deviceList[deviceID]["tsfTimeStampDiff"] = timeDiff;

        // TODO: Calculate an average of all time differences

        // Send a response message
        response
            .status(200) // HTTP status code 200: OK
            .send("OK"); // Response message
    });
}

module.exports = update;