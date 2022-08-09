// ./routes/update.js
// Updates the counts of devices connected to the server

// ===== JSON request format ===================================================

let = {
    "deviceID": "device_ID MAC",
    "temperature": "temp_int",
    "freeHeapMem": "free_heap_mem",
    "maxContigFreeHeapMem": "max_contig_free_heap_mem",
    "lastResetReason": "last_reset_reason",
    "tsfTimeStamp": "tsf_time_stamp",
};

// ===== Route functionality ===================================================

function update(app) {
    app.post("/update", (request, response) => {
        // Get the JSON device list
        let deviceList = request.body["deviceIDs"];

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
        global.deviceList[deviceID]["freeHeapMem"] = freeHeapMem;
        global.deviceList[deviceID]["maxContigFreeHeapMem"] = maxContigFreeHeapMem;

        // Compute the timestamp difference between the device and server
        let reportedTSF = request.body["tsfTimeStamp"];
        let serverTSF = Math.floor(Date.now() / 1000);
        let timeDiff = serverTSF - reportedTSF;
        global.deviceList[deviceID]["tsfTimeStampDiff"] = timeDiff;

        // TODO: Calculate an average of all time differences

        // Update the last reset reason of the device
        let resetReasonStr = global.resetReasons[lastResetReason];
        global.deviceList[deviceID]["lastResetReason"] = resetReasonStr;

        // Send a response message
        response
            .status(200) // HTTP status code 200: OK
            .send("OK"); // Response message
    });
}

module.exports = update;