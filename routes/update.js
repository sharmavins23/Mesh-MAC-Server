// ./routes/update.js
// Updates the counts of devices connected to the server

// ===== JSON request format ===================================================

let = {
    "deviceID": "device_ID MAC",
    "temperature": 0,
    "freeHeapSize": 0,
    "maxFreeHeapSize": 0,
    "resetReason": "last_reset_reason",
    "tsfTimeStamp": 0,
};

// ===== Route functionality ===================================================

function update(app) {
    app.post("/update", (request, response) => {
        // console.log(request.body);

        // Unpack the JSON object
        // ! The temperature JSON object is not properly functional
        let deviceID = request.body["deviceID"];
        let temperature = request.body["temperature"];
        let freeHeapSize = request.body["freeHeapSize"];
        let maxFreeHeapSize = request.body["maxFreeHeapSize"];
        let resetReason = request.body["resetReason"];

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

        // Update the basic information of the table from the device
        global.deviceList[deviceID]["temperature"] = temperature;
        global.deviceList[deviceID]["freeHeapMem"] = freeHeapSize;
        global.deviceList[deviceID]["maxContigFreeHeapMem"] = maxFreeHeapSize;
        global.deviceList[deviceID]["lastResetReason"] = resetReason;

        // Compute the timestamp difference between the device and server
        let reportedTSF = request.body["tsfTimeStamp"];
        let serverTSF = Math.floor(Date.now() / 1000);
        let timeDiff = serverTSF - reportedTSF;
        global.deviceList[deviceID]["tsfTimeStampDiff"] = timeDiff;

        // TODO: Calculate an average of all time differences

        // Send a response message
        response
            .status(200) // HTTP status code 200: OK
            .set("x-MD5", "test") // Extra MD5 header for later configuration
            .send("OK"); // Response message

        // console.log(global.deviceList);
    });
}

module.exports = update;