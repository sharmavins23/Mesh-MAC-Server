// ./routes/home.js
// Index of website - Displays all devices connected by MAC ID as well as the
//  number of JSON messages received at the server from the device

// ===== Route functionality ===================================================

function home(app) {
    app.get("/", (request, response) => {
        // Create our HTML page with the navbar
        let html = global.navbar;

        // Create the table headers
        html += `<div>
            <table>
                <tr>
                    <th>MAC ID</th>
                    <th>Count</th>
                    <th>Temperature</th>
                    <th>Free Heap Mem</th>
                    <th>Max Contig Free Heap Mem</th>
                    <th>Last Reset Reason</th>
                    <th>Timestamp Comparison</th>
                </tr>`;

        // Iterate through all devices and add them to the HTML page
        for (const [key, value] of Object.entries(global.deviceList)) {
            // Unpack all values
            let count = value["count"];
            let temp = value["temperature"];
            let freeHeapMem = value["freeHeapMem"];
            let maxContigFreeHeapMem = value["maxContigFreeHeapMem"];
            let lastResetReason = value["lastResetReason"];
            let tsfTimeStampDiff = value["tsfTimeStampDiff"];

            html += `<tr>
                <td>${key}</td>
                <td>${count}</td>
                <td>${temp}</td>
                <td>${freeHeapMem}</td>
                <td>${maxContigFreeHeapMem}</td>
                <td>${lastResetReason}</td>
                <td>${tsfTimeStampDiff}</td>
            </tr>`;
        }

        // Close the table
        html += `</table>
        </div>`;

        // Send the HTML page to the client
        response
            .status(200) // HTTP status code 200: OK
            .send(html); // Response message
    });
}

module.exports = home;