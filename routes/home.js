// ./routes/home.js
// Index of website - Displays all devices connected by MAC ID as well as the
//  number of JSON messages received at the server from the device

// ===== Route functionality ===================================================

function home(app) {
    app.get("/", (request, response) => {
        // Create our HTML page with the navbar
        let html = global.navbar;

        // Create the table headers
        html += `<table>
            <tr>
                <th>MAC ID</th>
                <th>Count</th>
            </tr>`;

        // Iterate through all devices and add them to the HTML page
        for (const [key, value] of Object.entries(global.deviceList)) {
            html += `<tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>`;
        }

        // Close the table
        html += `</table>`;

        // Send the HTML page to the client
        response
            .status(200) // HTTP status code 200: OK
            .send(html); // Response message
    });
}

module.exports = home;